window.onload = () => {
    // Function to get form values
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting to a server

        // Fetching values from the inputs
        const mortgageAmount = parseFloat(document.getElementById('mortgageamount').value); // Mortgage Amount
        const mortgageTerm = parseInt(document.getElementById('mortgageterm').value); // Mortgage Term
        const interestRate = parseFloat(document.getElementById('interestrate').value); // Interest Rate
        const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value; // Mortgage Type (Repayment or Interest-Only)

        // Convert interest rate from percentage to decimal, then monthly rate
        const monthlyRate = interestRate / 100 / 12;

        // Total number of payments (months)
        const totalPayments = mortgageTerm * 12;

        // Monthly payment calculation
        let monthlyPayment = 0;

        if (mortgageType === "repayment") {
            // Repayment mortgage calculation (using the formula)
            monthlyPayment = (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
        } else if (mortgageType === "interest-only") {
            // Interest-only mortgage calculation
            monthlyPayment = mortgageAmount * monthlyRate;
        }

        // Total mortgage paid over the entire term
        const totalMortgagePaid = monthlyPayment * totalPayments;

        // Log the values to the console
        console.log("Mortgage Amount:", mortgageAmount);
        console.log("Mortgage Term:", mortgageTerm);
        console.log("Interest Rate:", interestRate);
        console.log("Mortgage Type:", mortgageType);
        console.log("Monthly Payment:", monthlyPayment.toFixed(2)); // Log with two decimal places
        console.log("Total Mortgage Paid Over the Term:", totalMortgagePaid.toFixed(2));

        // Optional: Display results on the page

        // Hide the logo (if needed)
        let svg = document.querySelector('.logo');
        if (svg) {
            svg.style.display = 'none';
        }

        // Style the results section
        let results = document.querySelector('.results');
        if (results) {
            results.classList.remove('results');
            results.classList.add('stylized-res');
        }

        // Create a new div to hold the results
        const right = document.querySelector('.right-half');
        if (right) { // Check if the element exists before attempting to append
            // Remove previous results (if any)
            const previousResults = right.querySelector('.res');
            if (previousResults) {
                previousResults.remove();
            }

            const new_el = document.createElement('div');

            // Add the content with innerHTML (corrected to innerHTML)
            new_el.innerHTML = `
                <div class="upper">
                    <p>Your monthly repayments:</p>
                    <h1 class="yellow">£${monthlyPayment.toFixed(2)}</h1>
                </div>
                <div class="lower">
                    <p>Total you'll repay over the Term:</p>
                    <h5 class="total">£${totalMortgagePaid.toFixed(2)}</h5>
                </div>
            `;

            // Add the class for styling
            new_el.classList.add('res');

            // Append the new element to the right-half div
            right.appendChild(new_el);
        } else {
            console.error("Element with class 'right-half' not found.");
        }
    });

    // Clear all fields and results when the "Clear All" link is clicked
    document.getElementById('clear-all').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Clear all input fields
        document.getElementById('mortgageamount').value = '';
        document.getElementById('mortgageterm').value = '';
        document.getElementById('interestrate').value = '';
        document.querySelector('input[name="mortgageType"]:checked').checked = false; // Uncheck mortgage type

        // Remove previous results
        const right = document.querySelector('.right-half');
        if (right) {
            const previousResults = right.querySelector('.res');
            if (previousResults) {
                previousResults.remove();
            }
        }

        // Optional: Reset the styling of results section if needed
        let results = document.querySelector('.results');
        if (results) {
            results.classList.remove('stylized-res');
            results.classList.add('results');
        }
        let svg=document.querySelector(".logo")
        svg.style.display='block'
    });
}
