import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative'],
  },
  sizes: {
    type: [String],
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    default: ['M', 'L', 'XL'],
  },
  colors: {
    type: [String],
    required: true,
    default: ['Black', 'White'],
  },
  images: {
    type: [String],
    required: true,
    default: ['/placeholder-tshirt.png'], 
  },
  stock: {
    type: Number,
    required: true,
    default: 10,
    min: [0, 'Stock cannot be negative'],
  },
  category: {
    type: String,
    required: true,
    default: 'Unisex',
  }
}, { timestamps: true });

// Check if the model exists before compiling it
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
