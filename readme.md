# Amazon Sellers by ASIN Tool

A powerful web application for extracting seller information from Amazon product listings. Upload a spreadsheet of ASINs (Amazon Standard Identification Numbers) and retrieve a comprehensive list of all sellers offering those products.

![Amazon Sellers Tool Screenshot](https://via.placeholder.com/800x450)

## 🚀 Features

- **Bulk ASIN Processing**: Upload an Excel file with hundreds of ASINs at once
- **High-Performance Scraping**: Asynchronous processing with smart rate limiting
- **User-Friendly Interface**: Clean, responsive UI with real-time progress updates
- **Downloadable Results**: Export all seller data to CSV format
- **Caching System**: Optimized performance with in-memory result caching
- **Anti-Detection Measures**: Rotates user agents and implements proper request patterns

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+ (for React frontend)
- pip (Python package manager)

## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/amazon-sellers-tool.git
cd amazon-sellers-tool
```

2. **Set up a virtual environment (recommended)**

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. **Install backend dependencies**

```bash
pip install -r requirements.txt
```

4. **Install frontend dependencies (if using React UI)**

```bash
# Navigate to the frontend directory if applicable
npm install
```

## 💻 Usage

### Running the application

```bash
python app.py
```

The application will be available at `http://localhost:10000`

### Using the tool

1. Prepare an Excel (.xlsx) file with ASINs in column A
2. Upload the file through the web interface
3. Click "Process ASINs" to start the scraping process
4. Wait for the processing to complete (this may take several minutes depending on the number of ASINs)
5. Download the CSV file with all seller information

## 🏗️ Project Structure

```
amazon-sellers-tool/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html         # HTML template for the web UI
├── static/
│   └── company_banner.png # Site branding
├── uploads/               # Temporary folder for file uploads
└── AmazonScraperUI.jsx    # React component (alternative UI)
```

## ⚙️ Configuration Options

### Environment Variables

- `PORT`: Set the port number for the Flask server (default: 10000)

### Scraping Parameters (in app.py)

- `SEMAPHORE_LIMIT`: Control the number of concurrent requests (default: 3)
- `HEADERS`: User agent rotation for avoiding detection

## 🔍 How It Works

1. **ASIN Extraction**: The application reads ASINs from column A of your uploaded Excel file
2. **Concurrent Scraping**: Using Python's asyncio, the app makes controlled concurrent requests to Amazon
3. **Seller Extraction**: BeautifulSoup parses HTML to extract seller names from Amazon's "Other Sellers" pages
4. **Data Compilation**: Results are formatted with timestamps and compiled into a downloadable CSV

## ⚠️ Important Notes

- This tool is designed for research and competitive analysis purposes
- Always respect Amazon's Terms of Service and robots.txt when using web scraping tools
- Consider adding delays or reducing concurrency if you're processing a large number of ASINs

## 🛠️ Troubleshooting

**No data returned for some ASINs**
- Some products may not have multiple sellers
- Amazon might be throttling requests; try reducing the SEMAPHORE_LIMIT

**Upload fails**
- Ensure your Excel file has ASINs in column A
- File size should be under 10MB for reliable uploads

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- Project Maintainer: [Your Name](mailto:your.email@example.com)
- Revco Automations LLC

---

*This tool is not affiliated with, endorsed by, or sponsored by Amazon.com, Inc.*
