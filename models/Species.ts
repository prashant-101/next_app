import mongoose from 'mongoose';

const populationSchema = new mongoose.Schema({
  year: Number,
  count: Number,
}, { _id: false });

const distributionSchema = new mongoose.Schema({
  provinces: [String],
  districts: [String],
}, { _id: false });

const speciesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  category: { type: String, required: true },
  iucnStatus: { type: String, required: true },
  family: { type: String, required: true },
  population: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  location: String,
  foodAndDiet: String,
  natureAndActivity: String,
  spatialDistribution: String,
  distribution: distributionSchema,
  description: String,
  images: [String],
}, {
  timestamps: true,
});

const Species = mongoose.models.Species || mongoose.model('Species', speciesSchema);

export default Species;
