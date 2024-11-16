import companyModel from "../models/companyModel.js";

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.json({ message: "Company name is required", success: false });
    }

    let company = await companyModel.findOne({ name: companyName });
    if (company) {
      return res
        .json({ message: "Company already exist", success: false });
    }
    company = await companyModel.create({
      name: companyName,
      userId: req.id,
    });

    return res
      .json({ message: "Company registered successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await companyModel.find({ userId });
    if (!companies) {
      return res
        .json({ message: "No companies found", success: false });
    }
    res.json({ success: true, companies });
  } catch (error) {
    console.error(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res
        .json({ message: "Company not found", success: false });
    }
    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    // cloudinary url
    const file = req.file;

    const updateCompanyData = { name, description, website, location };
    const company = await companyModel.findByIdAndUpdate(
      req.params.id,
      updateCompanyData,
      { new: true }
    );

    if (!company) {
      return res
        .json({ message: "Company not found", success: false });
    }
    res.json({
      success: true,
      company,
      message: "Company information updated successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

export { registerCompany, getCompany, getCompanyById, updateCompany };
