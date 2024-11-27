document.addEventListener('DOMContentLoaded', function() {
    const printButton = document.getElementById('printButton');
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            const existingFooters = document.querySelectorAll('.print-footer');
            existingFooters.forEach(footer => footer.remove());

            const footer = document.createElement('div');
            footer.className = 'print-footer';
            
            const now = new Date().toLocaleString();
            
            footer.innerHTML = `
                <div class="print-footer-content">
                    <span class="print-time">${now}</span>
                    <span class="print-website">Newsletter.Intelliquinte.com</span>
                    <span class="print-copyright">© 2024 Intelliquinte L.L.C.</span>
                </div>
            `;

            document.body.appendChild(footer);

            const style = document.createElement('style');
            style.textContent = `
                @page {
                    margin: 0.75in 0.5in 0.3in 0.5in !important;
                    size: letter portrait;
                }
                
                @media print {
                    html, body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                    }

                    .header, .footer, .article-actions {
                        display: none !important;
                    }
                    
                    .article-template {
                        margin: 0 !important;
                        padding: 0 40px !important;
                        overflow: visible !important;
                    }
                    
                    .print-footer {
                        position: fixed !important;
                        bottom: 0 !important;
                        left: 0.5in !important;
                        right: 0.5in !important;
                        font-size: 8pt !important;
                        border-top: 1px solid #ccc !important;
                        padding-top: 2px !important;
                        background-color: white !important;
                        z-index: 9999 !important;
                        height: 0.2in !important;
                    }
                    
                    .print-footer-content {
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                    }
                    
                    .article-content {
                        margin-bottom: 0.3in !important;
                        overflow: visible !important;
                        page-break-inside: auto !important;
                    }

                    .article-content p {
                        overflow: visible !important;
                        page-break-inside: auto !important;
                        orphans: 3 !important;
                        widows: 3 !important;
                        margin-bottom: 12px !important;
                        line-height: 1.5 !important;
                    }

                    .article-content p:last-child {
                        margin-bottom: 0.3in !important;
                    }

                    * {
                        overflow: visible !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `;
            document.head.appendChild(style);

            window.print();

            setTimeout(() => {
                document.head.removeChild(style);
                document.body.removeChild(footer);
            }, 100);
        });
    }
}); 