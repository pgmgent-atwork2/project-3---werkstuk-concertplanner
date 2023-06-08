import DataSource from "../../lib/DataSource.js";

const planRepo = DataSource.getRepository("Plan");

export const getAllPlans = async (req, res) => {
  try {
    const plans = await planRepo.find({
      relations: ["user"],
    });

    res.status(200).json(plans);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getSpecificPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await planRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user"],
    });

    res.status(200).json(plan);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addPlan = async (req, res) => {
  try {
    const newPlan = {
      ...req.body,
    };

    await planRepo.save(newPlan);

    res.status(200).json({
      status: "Plan added succesfully!",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await planRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!plan) {
      res.status(404).json({
        status: "Plan not found, try another id",
      });
    } else {
      await planRepo.delete(plan);

      return res.status(200).json({
        status: "Plan deleted succesfully!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
