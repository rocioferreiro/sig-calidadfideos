const models = require("../database/models");

const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await models.User.findOne({
      where: { id: userId }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const {password, email} = req.body
    if (email.length < 1) return res.status(400).json('NOT VALID EMAIL')
    const user = await models.User.findOne({
      where: { email: email }
    });
    if (user) {
      if(user.password !== password) res.status(404).json("BAD CREDENTIALS");
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified email does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const createBatch = async (req, res) => {
  try {
    const batch = await models.Batch.create(req.body);
    return res.status(201).json({
      batch
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBatches = async (req, res) => {
  try {
    const batches = await models.Batch.findAll({
      include: [
        {
          model: models.BatchSamples,
          as: "samples",
          include: [
            {
              model: models.Sample,
              as: "sample"
            }
          ]
        },
        {
          model: models.Product,
          as: "product"
        }
      ]
    });
    return res.status(200).json({ batches });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBatchById = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await models.Batch.findOne({
      where: { id: batchId },
      include: [
        {
          model: models.BatchSamples,
          as: "samples",
          include: [
            {
              model: models.Sample,
              as: "sample"
            }
          ]
        },
        {
          model: models.Product,
          as: "product"
        }
      ]
    });
    if (batch) {
      return res.status(200).json({ batch });
    }
    return res.status(404).send("Batch with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createSample = async (req, res) => {
  try {
    const { batchId } = req.params;
    const sample = await models.Sample.create(req.body);
    const relation = await models.BatchSample.create({batchId: batchId, sampleId: sample.id});
    return res.status(201).json({
      sample, relation
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const prods = await models.Product.findAll();
    return res.status(200).json({ prods });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


module.exports = {
  getUsers,
  getUserById,
  login,
  createBatch,
  getBatches,
  getBatchById,
  createSample,
  getProducts
  // getAllPosts,
  // getPostById,
  // updatePost,
  // deletePost
};
