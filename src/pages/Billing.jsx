import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Billing = ({ isCollapsed }) => {
  const location = useLocation();
  const selectedMedicine = location.state?.selectedMedicine || null;
  const [bills, setBills] = useState([]);
  const invoiceRef = useRef();
  
  const [invoice, setInvoice] = useState({
    medicine: selectedMedicine?.name || "",
    quantity: "",
    price: "",
    tax: "",
    discount: "",
    total: selectedMedicine?.price || 0,
    paymentMethod: "cash",
  });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/invoices");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const calculateTotal = (quantity, price, tax, discount) => {
    let subtotal = (quantity || 0) * (price || 0);
    let taxAmount = (subtotal * (tax || 0)) / 100;
    let discountAmount = (subtotal * (discount || 0)) / 100;
    return (subtotal + taxAmount - discountAmount).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = name === "medicine" ? value : value === "" ? "" : parseFloat(value) || 0;

    const newInvoice = {
      ...invoice,
      [name]: updatedValue,
    };
    newInvoice.total = calculateTotal(
      newInvoice.quantity,
      newInvoice.price,
      newInvoice.tax,
      newInvoice.discount
    );
    setInvoice(newInvoice);
  };
  
  // Save invoice to api
  const saveInvoiceToAPI = async (invoiceData) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("http://localhost:5010/api/invoices", invoiceData);
      // Optionally, use response.data if your API returns the saved invoice
      return response.data;
    } catch (error) {
      console.error("Error saving invoice to API:", error);
      throw error;
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      // Save the invoice to the backend
      const savedInvoice = await saveInvoiceToAPI(invoice);
      // Update local state with the saved invoice
      setBills([...bills, savedInvoice]);
      // Optionally, you can show a success message to the user here

      // Reset invoice form after saving
      setInvoice({
        medicine: "",
        quantity: "",
        price: "",
        tax: "",
        discount: "",
        total: 0,
        paymentMethod: "cash",
      });
    } catch (error) {
      // Optionally, handle the error by showing an alert/message to the user
      console.error("Invoice could not be saved", error);
    }
  };

  const handleDeleteBill = (index) => {
    setBills(bills.filter((_, i) => i !== index));
  };

  const handlePrintInvoice = (bill, index) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    const printContent = `
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              padding: 20px;
              background: #fff;
            }
            .invoice-container { 
              max-width: 600px; 
              margin: auto; 
              border: 2px solid #e5e7eb; 
              border-radius: 12px;
              padding: 30px;
              background: #f8fafc;
            }
            .invoice-title { 
              text-align: center; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 20px;
              color: #3730a3;
            }
            .pharmacy-info {
              text-align: center;
              margin-bottom: 20px;
              color: #6b7280;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px dashed #e5e7eb;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .invoice-details table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .invoice-details th {
              background: #e0e7ff;
              padding: 12px;
              text-align: left;
            }
            .invoice-details td {
              padding: 12px;
              border-bottom: 1px solid #e5e7eb;
            }
            .totals-section {
              margin-top: 20px;
              padding: 15px;
              background: #f3f4f6;
              border-radius: 8px;
            }
            .thank-you {
              text-align: center;
              margin-top: 30px;
              color: #3730a3;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <h1 class="invoice-title">PharmaCare Medical Store</h1>
            <div class="pharmacy-info">
              <p>123 Health Street, MedCity</p>
              <p>📞 (555) 123-4567 | 📧 care@pharmacare.com</p>
            </div>
            
            <div class="invoice">
              <div class="invoice-header">
                <div>
                  <strong>Invoice #:</strong> MED${(index + 1).toString().padStart(3, '0')}<br>
                  <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div>
                  <strong>Payment Method:</strong><br>
                  ${bill.paymentMethod.charAt(0).toUpperCase() + bill.paymentMethod.slice(1)}
                </div>
              </div>
  
              <div class="invoice-details">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${bill.medicine}</td>
                      <td>${bill.quantity}</td>
                      <td>₹${parseFloat(bill.price).toFixed(2)}</td>
                      <td>₹${parseFloat(bill.total).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <div class="totals-section">
                <p><strong>Subtotal:</strong> ₹${(bill.quantity * bill.price).toFixed(2)}</p>
                <p><strong>Tax (${bill.tax}%):</strong> ₹${((bill.quantity * bill.price * bill.tax)/100).toFixed(2)}</p>
                <p><strong>Discount (${bill.discount}%):</strong> -₹${((bill.quantity * bill.price * bill.discount)/100).toFixed(2)}</p>
                <p><strong>Grand Total:</strong> ₹${parseFloat(bill.total).toFixed(2)}</p>
              </div>
  
              <div class="thank-you">
                Thank you for choosing PharmaCare! ❤️<br>
                <small>** This is a computer-generated receipt **</small>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={`${isCollapsed ? "ml-20" : "ml-64"} p-6`}>
      {/* Invoice Generation Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-5 text-indigo-600 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 me-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>

        Invoice Generation
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="medicine"
          value={invoice.medicine}
          onChange={handleInputChange}
          placeholder="Medicine Name"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="quantity"
          type="number"
          value={invoice.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="price"
          type="number"
          value={invoice.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="tax"
          type="number"
          value={invoice.tax}
          onChange={handleInputChange}
          placeholder="Tax (%)"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="discount"
          type="number"
          value={invoice.discount}
          onChange={handleInputChange}
          placeholder="Discount (%)"
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="paymentMethod"
          value={invoice.paymentMethod}
          onChange={handleInputChange}
          className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="cash">Cash</option>
          <option value="card">Credit/Debit Card</option>
          <option value="insurance">Insurance</option>
          <option value="wallet">Digital Wallet</option>
        </select>
      </div>

      <div className="text-lg font-bold text-gray-900 bg-gray-100 p-4 rounded-lg shadow-sm mb-4 text-center border border-indigo-200">
        Total: ₹{invoice.total}
      </div>

      <button
        onClick={handleGenerateInvoice}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full hover:shadow-md transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
          />
        </svg>
        Generate Invoice
      </button>
    </div>
      {/* List of Invoices */}
      <div ref={invoiceRef} className="bg-white shadow-lg rounded-xl p-6 font-sans">
  <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
    Medical Invoices
  </h2>
  
  {bills.length > 0 ? (
    <div className="space-y-6">
      {bills.map((bill, index) => (
        <div
          key={index}
          className="p-6 border-l-4 border-indigo-500 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex flex-col md:flex-row justify-between border-b pb-3 mb-3">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                Invoice #MED{index + 1}
              </span>
              <span className="text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
              {bill.paymentMethod}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Medicine</p>
              <p className="font-semibold text-indigo-600">{bill.medicine}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Quantity</p>
              <p className="font-semibold">{bill.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Unit Price</p>
              <p className="font-semibold">₹{bill.price}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Total</p>
              <p className="font-semibold text-green-600">₹{bill.total}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm border-t pt-3">
            <div className="space-x-4 mb-2 md:mb-0">
              <span className="text-gray-600">
                Tax: <span className="font-medium">{bill.tax}%</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">
                Discount: <span className="font-medium text-green-600">{bill.discount}%</span>
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDeleteBill(index)}
                className="flex items-center text-red-500 hover:text-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
              <button
  onClick={() => handlePrintInvoice(bill, index)}
  className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all flex items-center"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
  Print Invoice
</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-gray-600 font-medium">No medical invoices generated yet</p>
    </div>
  )}
</div>
<div className="p-6  rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-indigo-500 flex items-center">
        
        Invoices
      </h2>

      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md text-gray-700">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7-7a9 9 0 1118 0 9 9 0 01-18 0z"></path>
          </svg>
          <p className="text-lg font-semibold">No invoices found</p>
          <p className="text-sm text-gray-500">Create an invoice to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-indigo-600 text-white uppercase text-sm">
                <th className="border border-gray-300 px-4 py-3">Invoice ID</th>
                <th className="border border-gray-300 px-4 py-3">Medicine</th>
                <th className="border border-gray-300 px-4 py-3">Quantity</th>
                <th className="border border-gray-300 px-4 py-3">Price</th>
                <th className="border border-gray-300 px-4 py-3">Tax</th>
                <th className="border border-gray-300 px-4 py-3">Discount</th>
                <th className="border border-gray-300 px-4 py-3">Total</th>
                <th className="border border-gray-300 px-4 py-3">Payment</th>
                <th className="border border-gray-300 px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice._id} className="hover:bg-gray-100 transition duration-300 text-gray-700">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-indigo-600">
                    MED{String(index + 1).padStart(3, "0")}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{invoice.medicine}</td>
                  <td className="border border-gray-300 px-4 py-3">{invoice.quantity}</td>
                  <td className="border border-gray-300 px-4 py-3">{"\u20B9"} {invoice.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-3">{"\u20B9"} {invoice.tax.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-3">{"\u20B9"} {invoice.discount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold">{"\u20B9"}{invoice.total.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        invoice.paymentMethod === "Paid"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {invoice.paymentMethod}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                  {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>


    </div>
  );
};

export default Billing;
