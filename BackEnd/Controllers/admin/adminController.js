import { User } from "../../Models/userAuthentication.js";
 
// User Management -> View Users -> 1) viewSellers -> 2 viewBuyers
export const selectSellers = async (req, res, next) => {
  try {
    // Query using $in to match both "seller" and "Seller"
    const sellers = await User.find({ role: { $in: ["seller", "Seller"] } });
    
    res.json({ sellers });
  } catch (error) {
    next(error);
  }
};

export const selectBuyers = async (req, res, next) => {
  try {
    const buyers = await User.find({ role: { $in: ["buyer", "Buyer"] } });
    res.json({ buyers });
  } catch (error) {}
};

// moderator
export const selectModerators = async (req, res, next) => {
  try {
    const moderators = await User.find({ role: {$in: ["moderator", "Moderator"] }});
    res.json({ moderators });
  } catch (error) {}
};
// all users

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

// Edit User Profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user) {
      const { name, newEmail } = req.body;
      user = await User.findByIdAndUpdate(
        user._id,
        { name: name, email: newEmail },
        { new: true }
      );
      await user.save();
      res.json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    }
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// User Management -> Update User Role -> 1) updateSeller -> 2) updateBuyer
export const userRoleAssignment = async (req, res) => {
  try {
    const { email, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const allowedRoles = ["admin", "seller", "buyer"];
    if (allowedRoles.includes(user.role.toLowerCase())) {
      user = await User.findByIdAndUpdate(user._id, { role }, { new: true });

      res.json({ success: true, message: "Role updated successfully", user });
    } else {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to change roles",
        });
    }
  } catch (error) {
    console.error("Error in user Role Assignment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// banUsers

export const banUsers = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      user._id,
      { isBanned: true },
      { new: true }
    );

    res.json({ success: true, message: "User banned successfully", user });
  } catch (error) {
    console.error("Error in banUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// unban Users
export const unbanUsers = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user = await User.findByIdAndUpdate(
      user._id,
      { isBanned: false },
      { new: true }
    );

    res.json({ success: true, message: "User unbanned successfully", user });
  } catch (error) {
    console.error("Error in unbanUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Manage Categories

 
  