import Menu from "../models/menu.js";

// ✅ CREATE MENU (PLAN-BASED)
export const createMenu = async (req, res) => {
  try {
    const vendorId = req.user.id;
    console.log("FULL BODY:", req.body);
    console.log("ITEMS TYPE:", typeof req.body.items);

    let { planId, day, mealType, items } = req.body;

    // ✅ FIX: handle stringified items (your current bug)
    if (typeof items === "string") {
      try {
        items = JSON.parse(items);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid items format (must be JSON array)"
        });
      }
    }

    // ✅ Validate items is array
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Items must be an array"
      });
    }

    // ✅ Prevent duplicate (same plan + day + mealType)
    const existing = await Menu.findOne({
      vendorId,
      planId,
      day,
      mealType
    });

    if (existing) {
      return res.status(400).json({
        message: "Menu already exists for this plan/day/meal"
      });
    }

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
    res.status(500).json({ error: error.message });
  }
};
export const getMenuByPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const menus = await Menu.find({ planId })
      .sort({ createdAt: -1 });

    res.json({
      menus
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMenus = async (req, res) => {
  try {
    const vendorId = req.user.id;

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