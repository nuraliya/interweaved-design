// Interweaved Design Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    const floatingTexts = document.querySelectorAll('.floating-text:not(.editable)');
    const editableTexts = document.querySelectorAll('.floating-text.editable input');
    const altContainer = document.getElementById('altContainer');
    const saveBtn = document.getElementById('saveBtn');
    
    // Handle save button click - create clean PDF with matching design
    saveBtn.addEventListener('click', function() {
        // Store original styles
        const originalBodyStyle = document.body.style.cssText;
        
        // Create a clean print container
        const printContainer = document.createElement('div');
        printContainer.className = 'print-only-container';
        printContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #FFF4E8;
            background: linear-gradient(to top, #566FEE, transparent), #FFF4E8;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 40px;
            z-index: 999999;
            font-family: "ABC Oracle Plus Variable Edu", Inter, sans-serif;
            min-height: 100vh;
        `;
        
        // Get the main text and its computed styles
        const mainTextElement = document.querySelector('.main-text');
        
        // Create main text for print
        const printMainText = document.createElement('h1');
        printMainText.textContent = mainTextElement.textContent;
        printMainText.style.cssText = `
            color: #A38007;
            font-family: "ABC Oracle Plus Variable Edu", Inter, sans-serif;
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 0.64px;
            margin: 0 0 60px 0;
            text-align: center;
            white-space: nowrap;
            width: 100%;
            mix-blend-mode: difference;
            filter: invert(1);
        `;
        
        // Create container for added texts
        const printTextsContainer = document.createElement('div');
        printTextsContainer.style.cssText = `
            max-width: 600px;
            text-align: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;
        
        // Get all visible added texts
        const visibleTexts = altContainer.querySelectorAll('.alt-text.visible, .custom-text.visible');
        visibleTexts.forEach(textEl => {
            const textContent = textEl.querySelector('span') ? 
                textEl.querySelector('span').textContent : 
                textEl.textContent;
            
            const printTextDiv = document.createElement('p');
            printTextDiv.textContent = textContent;
            printTextDiv.style.cssText = `
                color: #A38007;
                font-family: "ABC Oracle Plus Variable Edu", Inter, sans-serif;
                font-size: 16px;
                font-weight: 300;
                line-height: 20px;
                margin-bottom: 16px;
                margin-top: 0;
                text-align: center;
                width: 100%;
                mix-blend-mode: difference;
                filter: invert(1);
            `;
            printTextsContainer.appendChild(printTextDiv);
        });
        
        // Assemble print container
        printContainer.appendChild(printMainText);
        printContainer.appendChild(printTextsContainer);
        
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.innerHTML = `
            @import url('https://cdn.glitch.global/b87672a1-7584-45f0-9836-aaf90e598828/ABCOraclePlusVariableEdu-Regular.woff?v=1749578637317');
            
            @media print {
                * {
                    visibility: hidden !important;
                }
                
                .print-only-container,
                .print-only-container * {
                    visibility: visible !important;
                }
                
                .print-only-container {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: #FFF4E8 !important;
                    background: linear-gradient(to top, #566FEE, transparent), #FFF4E8 !important;
                    font-family: "ABC Oracle Plus Variable Edu", Inter, sans-serif !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 80px 40px !important;
                    margin: 0 !important;
                    box-sizing: border-box !important;
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                @page {
                    margin: 0;
                    size: A4;
                }
                
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: #FFF4E8 !important;
                    background: linear-gradient(to top, #566FEE, transparent), #FFF4E8 !important;
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
            
            @media screen {
                .print-only-container {
                    display: none;
                }
            }
        `;
        
        // Add everything to DOM
        document.head.appendChild(printStyles);
        document.body.appendChild(printContainer);
        
        // Hide original content and show print container
        document.body.style.visibility = 'hidden';
        printContainer.style.display = 'flex';
        
        // Trigger print dialog
        setTimeout(() => {
            window.print();
            
            // Clean up after print dialog closes
            setTimeout(() => {
                document.body.removeChild(printContainer);
                document.head.removeChild(printStyles);
                document.body.style.cssText = originalBodyStyle;
                document.body.style.visibility = 'visible';
            }, 1000);
        }, 100);
    });
    
    // Handle preset floating texts
    floatingTexts.forEach(text => {
        text.addEventListener('click', function() {
            const altText = this.getAttribute('data-alt');
            
            if (altText) {
                // Create new alt text element
                const altDiv = document.createElement('div');
                altDiv.className = 'alt-text';
                altDiv.textContent = altText;
                
                // Add to container
                altContainer.appendChild(altDiv);
                
                // Trigger animation
                setTimeout(() => {
                    altDiv.classList.add('visible');
                }, 10);
                
                // Add subtle click feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Handle editable text inputs
    editableTexts.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const customText = this.value.trim();
                
                // Create new custom text element with remove button
                const customDiv = document.createElement('div');
                customDiv.className = 'custom-text';
                
                // Create text content and remove button
                const textSpan = document.createElement('span');
                textSpan.textContent = customText;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = '×';
                removeBtn.type = 'button';
                
                // Add click event to remove button
                removeBtn.addEventListener('click', function() {
                    removeCustomText(this);
                });
                
                // Append elements
                customDiv.appendChild(textSpan);
                customDiv.appendChild(removeBtn);
                
                // Add to container
                altContainer.appendChild(customDiv);
                
                // Trigger animation
                setTimeout(() => {
                    customDiv.classList.add('visible');
                }, 10);
                
                // Clear input and add feedback
                this.value = '';
                const parentSphere = this.parentElement;
                parentSphere.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    parentSphere.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Function to remove custom text
    function removeCustomText(button) {
        const textElement = button.parentElement;
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (textElement.parentNode) {
                textElement.parentNode.removeChild(textElement);
            }
        }, 400);
    }
});