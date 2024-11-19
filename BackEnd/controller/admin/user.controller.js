import { User } from "../../model/user.model.js";




// User Management -> View Users -> 1) viewSellers -> 2 viewBuyers
export const getSellers = async (req, res, next) => {
  try {
    const sellers = await User.find({
      $or: [
        { role: { $in: ["seller", "Seller"] } },
        { originalRole: { $in: ["seller", "Seller"] } },
      ],
    });

    res.json({ sellers });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ message: "Error fetching sellers", error });
  }
};

export const getBuyers = async (req, res, next) => {
  try {
    const buyers = await User.find({
      $or: [
        { role: { $in: ["buyer", "Buyer"] } },
        { originalRole: { $in: ["buyer", "Buyer"] } },
      ],
    });
    res.json({ buyers });
  } catch (error) {
    next(error);
  }
};
export const getModerators = async (req, res, next) => {
  try {
    const moderators = await User.find({
      $or: [
        { role: { $in: ["moderator", "Mderator"] } },
        { originalRole: { $in: ["moderator", "Moderator"] } },
      ],
    });
    res.json({ moderators });
  } catch (error) {}
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

// Edit User Profile
export const editUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(JSON.stringify(user));
    const { name, email, role } = req.body;
    user.name = name;
    user.email = email;
    user.role = role;

    await user.save(); // Save the updated user

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const setUserRole = async (req, res) => {
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
      return res.status(403).json({
        success: false,
        message: "You are not authorized to change roles",
      });
    }
  } catch (error) {
    console.error("Error in user Role Assignment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const displayUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// banUsers
export const banUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.originalRole = user.role;
    user.role = "banned";
    user.isBanned = true;
    await user.save();
    console.log("User banned successfully");
    res.json({
      success: true,
      message: "User banned successfully",
      user: { ...user },
    });
  } catch (error) {
    console.error("Error in banUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// unban Users
export const unbanUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const originalRole = user.originalRole;
    user.role = user.originalRole;
    console.log("User unbanned successfully", originalRole);
    user.isBanned = false;

    await user.save();

    res.json({
      success: true,
      message: "User unbanned successfully",
      user,
    });
  } catch (error) {
    console.error("Error in unbanUsers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
