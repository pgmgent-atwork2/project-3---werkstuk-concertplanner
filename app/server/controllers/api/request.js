import DataSource from "../../lib/DataSource.js";

const requestRepo = DataSource.getRepository("Request");

export const getAllRequests = async (req, res) => {
  try {
    const requests = await requestRepo.find({
      relations: ["user"],
    });

    res.status(200).json(requests);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getSpecificRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await requestRepo.findOne({
      where: {
        id: id,
      },
      relations: ["user"],
    });

    res.status(200).json(request);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addRequest = async (req, res) => {
  try {
    const newRequest = {
      ...req.body,
    };

    await requestRepo.save(newRequest);

    res.status(200).json({
      status: "Request added succesfully!",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await requestRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!request) {
      res.status(404).json({
        status: "Request not found, try another id",
      });
    } else {
      await requestRepo.delete(request);

      return res.status(200).json({
        status: "Request deleted succesfully!",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
