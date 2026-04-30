/*import Menu from "../models/menu.js";

// CREATE MENU (PLAN-BASED)

export const createMenu = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    // Get planId from params (IMPORTANT)
    const { planId } = req.params;

    let { day, mealType, items } = req.body;

    console.log("PLAN ID:", planId);
    console.log("BODY:", req.body);

    // Fix string items issue
    if (typeof items === "string") {
      items = JSON.parse(items);
    }

    // Validate items
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Items must be an array"
      });
    }

    // Prevent duplicate menu
    const existing = await Menu.findOne({
      vendorId,
      planId,
      day,
      mealType
    });

    if (existing) {
      return res.status(400).json({
        message:
          "Menu already exists for this plan/day/meal"
      });
    }

    // Create menu
    const menu = await Menu.create({
      vendorId,
      planId,
      day,
      mealType,
      items
    });

    res.status(201).json({
      message: "Menu created successfully",
      menu
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};

export const getMenus = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const menus = await Menu.find({ vendorId })
      .populate("planId") // useful for showing plan name in UI
      .sort({ createdAt: -1 });

    res.json({
      menus
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update menu
export const updateMenu = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const { id } = req.params;

    let { day, mealType, items } = req.body;

    console.log("UPDATE BODY:", req.body);

    // Fix stringified items
    if (typeof items === "string") {
      try {
        items = JSON.parse(items);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid items format"
        });
      }
    }

    // Validate items
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Items must be an array"
      });
    }

    // Find existing menu first
    const existingMenu = await Menu.findById(id);

    if (!existingMenu) {
      return res.status(404).json({
        message: "Menu not found"
      });
    }

    // Check vendor ownership
    if (existingMenu.vendorId.toString() !== vendorId) {
      return res.status(403).json({
        message: "Unauthorized action"
      });
    }

    // Prevent duplicate (same plan/day/mealType)
    const duplicate = await Menu.findOne({
      vendorId,
      planId: existingMenu.planId,
      day,
      mealType,
      _id: { $ne: id }
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Menu already exists for this day and meal"
      });
    }

    //  Update menu
     if (day) existingMenu.day = day;
     if (mealType) existingMenu.mealType = mealType;
     if (items) existingMenu.items = items;

    await existingMenu.save();

    res.json({
      message: "Menu updated successfully",
      menu: existingMenu
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);

    res.json({
      message: "Menu deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    // GET MENU BY PLAN (User side)
export const getMenuByPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const menus = await Menu.find({ planId })
      .sort({ day: 1 });

    res.json({
      menus
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
// GET SINGLE MENU (for edit form)
export const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found"
      });
    }

    res.json({
      menu
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};*/
/*import Menu from "../models/menu.js";

// ✅ CREATE / UPDATE MENU (SINGLE API)
export const saveMenu = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const { planId, day, lunch, dinner } = req.body;

    if (!planId || !day) {
      return res.status(400).json({
        message: "planId and day are required"
      });
    }

    let menu = await Menu.findOne({ vendorId, planId, day });

    if (menu) {
      // update
      menu.lunch = lunch;
      menu.dinner = dinner;
      await menu.save();
    } else {
      // create
      menu = await Menu.create({
        vendorId,
        planId,
        day,
        lunch,
        dinner
      });
    }

    res.json({
      message: "Menu saved successfully",
      menu
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET MENU BY PLAN (for frontend)
export const getMenuByPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const vendorId = req.vendor._id;

    const menus = await Menu.find({ vendorId, planId })
      .sort({ day: 1 });

    res.json({ menus });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE MENU
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);

    res.json({
      message: "Menu deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/
import Menu from "../models/menu.js";

// ✅ CREATE / UPDATE MENU (MERGED LOGIC)
export const saveMenu = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // ✅ FIXED

    const { planId, day, lunch, dinner } = req.body;

    if (!planId || !day) {
      return res.status(400).json({
        message: "planId and day are required"
      });
    }

    let menu = await Menu.findOne({ vendorId, planId, day });

    if (menu) {
      // update
      menu.lunch = lunch || [];
      menu.dinner = dinner || [];
      await menu.save();
    } else {
      // create
      menu = await Menu.create({
        vendorId,
        planId,
        day,
        lunch,
        dinner
      });
    }

    res.json({
      message: "Menu saved successfully",
      menu
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL MENUS (VENDOR)
export const getMenus = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // ✅ FIXED

    const menus = await Menu.find({ vendorId })
      .populate("planId")
      .sort({ createdAt: -1 });

    res.json({ menus });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET MENU BY PLAN
export const getMenuByPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const vendorId = req.vendor._id; // ✅ FIXED

    const menus = await Menu.find({ vendorId, planId })
      .sort({ day: 1 });

    res.json({ menus });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET SINGLE MENU
export const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found"
      });
    }

    res.json({ menu });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE MENU
export const deleteMenu = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // ✅ FIXED
    const { id } = req.params;

    const menu = await Menu.findOneAndDelete({
      _id: id,
      vendorId
    });

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found"
      });
    }

    res.json({
      message: "Menu deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};