const path = require('path'); // Import the path module
const dotenv = require('dotenv');
dotenv.config();
const mongooseDBConnection = require('./database/mongoDB');
const fs = require('fs').promises;

const Job = require('./model/jobModel');
const User = require('./model/userModel');

const populate = async () => {
  try {
    await mongooseDBConnection();
    const user = await User.findOne({ email: 'jo@gmail.com' });
    // Construct the full path to your JSON file
    const jsonFilePath = path.join(__dirname, 'utils', 'mock_data.json');

    // Read the JSON file
    const jsonContent = await fs.readFile(jsonFilePath, 'utf8');

    // Parse the JSON content
    const jsonJobs = JSON.parse(jsonContent);

    const jobs = jsonJobs.map((job) => {
      return { ...job, createdBy: user._id };
    });

    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);
    console.log('Success!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

populate();
