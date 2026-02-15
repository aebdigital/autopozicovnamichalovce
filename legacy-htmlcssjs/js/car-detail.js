// Car Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get car details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('car');
    
    if (carId) {
        loadCarDetails(carId);
    } else {
        // If no car ID provided, default to kia-stonic
        loadCarDetails('kia-stonic');
    }
    
    // Initialize date inputs
    initializeDateInputs();
    
    // Add event listeners
    addEventListeners();
});

// Car data
const carData = {
    'kia-stonic': {
        name: 'Kia Stonic',
        price: 25,
        image: '../sources/cars/kia stonic.png',
        category: 'Kompakt',
        seats: 5,
        transmission: 'Automat',
        fuel: 'Benzín',
        luggage: '3 kusy',
        description: 'Kia Stonic je moderné kompaktné crossover vozidlo, ktoré kombinuje štýl, komfort a praktickosť. Ideálne pre mestskú jazdu i dlhšie výlety. Vozidlo je vybavené najnovšími bezpečnostnými prvkami a ponúka výnimočný jazdný komfort.',
        pricing: {
            '1day': 40,
            '2-3days': 35,
            '4-7days': 30,
            '7-21days': 25,
            '21plus': 'Cena dohodou',
            deposit: 200
        },
        limits: {
            daily: '200km',
            excess: '0,10€/km'
        }
    },
    'skoda-octavia-sedan': {
        name: 'Škoda Octavia Sedan',
        price: 25,
        image: '../sources/cars/skoda octavia sedan.jpg',
        category: 'Sedan',
        seats: 5,
        transmission: 'Manuál',
        fuel: 'Benzín',
        luggage: '4 kusy',
        description: 'Elegantný sedan s vynikajúcim komfortom a priestorom. Škoda Octavia ponúka luxusné cestovanie s moderným dizajnom a spoľahlivou technikou.',
        pricing: {
            '1day': 40,
            '2-3days': 35,
            '4-7days': 30,
            '7-21days': 25,
            '21plus': 'Cena dohodou',
            deposit: 200
        },
        limits: {
            daily: '200km',
            excess: '0,10€/km'
        }
    },
    'skoda-octavia-rs': {
        name: 'Škoda Octavia RS',
        price: 50,
        image: '../sources/cars/skoda octavia rs.png',
        category: 'Šport',
        seats: 5,
        transmission: 'Automat',
        fuel: 'Diesel',
        luggage: '4 kusy',
        description: 'Vysokovýkonná športová verzia s dynamickým dizajnom. Škoda Octavia RS kombinuje športový výkon s praktickosťou rodinného auta.',
        pricing: {
            '1day': 70,
            '2-3days': 65,
            '4-7days': 60,
            '7-21days': 50,
            '21plus': 'Cena dohodou',
            deposit: 500
        },
        limits: {
            daily: '200km',
            excess: '0,10€/km'
        }
    },
    'skoda-superb-combi': {
        name: 'Škoda Superb Combi',
        price: 40,
        image: '../sources/cars/skoda superb combi.jpg',
        category: 'Kombi',
        seats: 5,
        transmission: 'Automat',
        fuel: 'Diesel',
        luggage: '6 kusov',
        description: 'Prémiové kombi s maximálnym nákladovým priestorom. Ideálne pre rodiny a dlhé cesty s veľkým množstvom batožiny.',
        pricing: {
            '1day': 55,
            '2-3days': 50,
            '4-7days': 45,
            '7-21days': 40,
            '21plus': 'Cena dohodou',
            deposit: 300
        },
        limits: {
            daily: '200km',
            excess: '0,10€/km'
        }
    },
    'toyota-proace': {
        name: 'Toyota Proace 8-miestny',
        price: 75,
        image: '../sources/cars/Toyota Proace 8 miestna .png',
        category: 'Van',
        seats: 8,
        transmission: 'Manuál',
        fuel: 'Diesel',
        luggage: '10 kusov',
        description: 'Priestranný van ideálny pre skupinové cestovanie a rodiny. Toyota Proace ponúka pohodlie a spoľahlivosť pre až 8 pasažierov.',
        pricing: {
            '1day': 90,
            '2-3days': 85,
            '4-7days': 80,
            '7-21days': 75,
            '21plus': 'Cena dohodou',
            deposit: 300
        },
        limits: {
            daily: '300km',
            excess: '0,20€/km'
        }
    },
    'peugeot-boxer': {
        name: 'Peugeot Boxer L4H3',
        price: 65,
        image: '../sources/cars/Peugeot Boxer L4H3 .jpg',
        category: 'Nákladný',
        seats: 3,
        transmission: 'Manuál',
        fuel: 'Diesel',
        luggage: '15m³',
        description: 'Veľký nákladný van pre sťahovanie a komerčné použitie. Peugeot Boxer ponúka obrovský nákladový priestor a spoľahlivosť.',
        pricing: {
            '1day': 80,
            '2-3days': 75,
            '4-7days': 70,
            '7-21days': 65,
            '21plus': 'Cena dohodou',
            deposit: 300
        },
        limits: {
            daily: '200km',
            excess: '0,20€/km'
        }
    }
};

function loadCarDetails(carId) {
    const car = carData[carId];
    if (!car) {
        console.error('Car not found:', carId);
        // Load default car (kia-stonic) if car ID not found
        const defaultCar = carData['kia-stonic'];
        if (defaultCar) {
            loadCarDetails('kia-stonic');
        }
        return;
    }
    
    // Update car details
    document.getElementById('carMainImage').src = car.image;
    document.getElementById('carMainImage').alt = car.name;
    document.getElementById('carTitle').textContent = car.name;
    document.getElementById('carSeats').textContent = car.seats;
    document.getElementById('carTransmission').textContent = car.transmission;
    document.getElementById('carFuel').textContent = car.fuel;
    document.getElementById('carLuggage').textContent = car.luggage;
    document.getElementById('carDescription').textContent = car.description;
    document.getElementById('dailyRate').textContent = car.price + '€';
    
    // Update page title
    document.title = `${car.name} - Detail vozidla - Autopožičovňa Michalovce`;
    
    // Update summary images and titles across all steps
    const summaryImages = ['summaryCarImage', 'summaryCarImage2', 'summaryCarImage3'];
    const summaryTitles = ['summaryCarTitle', 'summaryCarTitle2', 'summaryCarTitle3'];
    
    summaryImages.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.src = car.image;
    });
    
    summaryTitles.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = car.name;
    });
    
    // Update pricing table if car has pricing data
    if (car.pricing) {
        updatePricingTable(car);
    }
}

function updatePricingTable(car) {
    // Update individual pricing rows
    const pricing1day = document.getElementById('pricing1day');
    const pricing2_3days = document.getElementById('pricing2-3days');
    const pricing4_7days = document.getElementById('pricing4-7days');
    const pricing7_21days = document.getElementById('pricing7-21days');
    const pricing21plus = document.getElementById('pricing21plus');
    
    if (pricing1day) {
        pricing1day.querySelector('.price').textContent = car.pricing['1day'] + '€';
    }
    if (pricing2_3days) {
        pricing2_3days.querySelector('.price').textContent = car.pricing['2-3days'] + '€';
    }
    if (pricing4_7days) {
        pricing4_7days.querySelector('.price').textContent = car.pricing['4-7days'] + '€';
    }
    if (pricing7_21days) {
        pricing7_21days.querySelector('.price').textContent = car.pricing['7-21days'] + '€';
    }
    if (pricing21plus) {
        pricing21plus.querySelector('.price').textContent = car.pricing['21plus'];
    }
    
    // Update deposit in summary section
    const depositSpan = document.querySelector('.summary-row.deposit span:last-child');
    if (depositSpan && car.pricing.deposit) {
        depositSpan.textContent = car.pricing.deposit + '€';
    }
    
    // Update limits in reservation note
    if (car.limits) {
        const reservationNote = document.querySelector('.reservation-note');
        if (reservationNote) {
            const limitText = reservationNote.querySelector('p:last-child');
            if (limitText) {
                limitText.textContent = `Denný limit ${car.limits.daily}, nad limit ${car.limits.excess}.`;
            }
        }
    }
}

function initializeDateInputs() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    // Set minimum dates
    pickupDate.min = today.toISOString().split('T')[0];
    returnDate.min = tomorrow.toISOString().split('T')[0];
    
    // Set default dates
    pickupDate.value = today.toISOString().split('T')[0];
    returnDate.value = tomorrow.toISOString().split('T')[0];
    
    updateTotalPrice();
}

function addEventListeners() {
    // Date change listeners
    document.getElementById('pickupDate').addEventListener('change', updateReturnDateMin);
    document.getElementById('returnDate').addEventListener('change', updateTotalPrice);
    document.getElementById('pickupDate').addEventListener('change', updateTotalPrice);
    
    // Reservation form submit
    document.getElementById('reservationForm').addEventListener('submit', startReservationProcess);
    
    // Service checkboxes in step 2
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && (e.target.name === 'insurance' || e.target.name === 'services')) {
            updateStep2Pricing();
        }
    });
}

function updateReturnDateMin() {
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate) {
        const minReturnDate = new Date(pickupDate);
        minReturnDate.setDate(minReturnDate.getDate() + 1);
        returnDate.min = minReturnDate.toISOString().split('T')[0];
        
        if (returnDate.value <= pickupDate) {
            returnDate.value = minReturnDate.toISOString().split('T')[0];
        }
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    if (pickupDate && returnDate) {
        const days = calculateDaysBetween(pickupDate, returnDate);
        const urlParams = new URLSearchParams(window.location.search);
        let carId = urlParams.get('car');
        
        // If no car ID or invalid car ID, use kia-stonic as default
        if (!carId || !carData[carId]) {
            carId = 'kia-stonic';
        }
        
        const car = carData[carId];
        const dailyRate = calculateDailyRate(car, days);
        const totalPrice = days * dailyRate;
        
        document.getElementById('totalDays').textContent = days;
        document.getElementById('totalPrice').textContent = totalPrice + '€';
        document.getElementById('dailyRate').textContent = dailyRate + '€';
    }
}

function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function calculateDailyRate(car, days) {
    if (!car.pricing) return car.price;
    
    if (days === 1) {
        return car.pricing['1day'];
    } else if (days >= 2 && days <= 3) {
        return car.pricing['2-3days'];
    } else if (days >= 4 && days <= 6) {
        return car.pricing['4-7days'];
    } else if (days >= 7 && days <= 21) {
        return car.pricing['7-21days'];
    } else {
        // For 21+ days, use the lowest rate (7-21days rate) or return special pricing
        return car.pricing['7-21days'];
    }
}

function changeImage(thumbnail) {
    const mainImage = document.getElementById('carMainImage');
    mainImage.src = thumbnail.src;
    
    // Update active thumbnail
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Reservation Process
function startReservationProcess(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateReservationForm()) {
        return;
    }
    
    // Populate step 1 data
    populateStep1Data();
    
    // Show reservation steps modal
    document.getElementById('reservationSteps').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of modal
    document.getElementById('reservationSteps').scrollTop = 0;
}

function validateReservationForm() {
    const form = document.getElementById('reservationForm');
    return form.checkValidity();
}

function populateStep1Data() {
    const urlParams = new URLSearchParams(window.location.search);
    let carId = urlParams.get('car');
    
    // If no car ID or invalid car ID, use kia-stonic as default
    if (!carId || !carData[carId]) {
        carId = 'kia-stonic';
    }
    
    const car = carData[carId];
    if (!car) return;
    
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const returnTime = document.getElementById('returnTime').value;
    const pickupLocationValue = document.getElementById('pickupLocation').value;
    const returnLocationValue = document.getElementById('returnLocation').value;
    const pickupLocation = document.getElementById('pickupLocation').selectedOptions[0].text;
    const days = calculateDaysBetween(pickupDate, returnDate);
    const dailyRate = calculateDailyRate(car, days);
    const totalPrice = days * dailyRate;
    
    // Update all step summaries
    const summaryData = {
        images: ['summaryCarImage', 'summaryCarImage2', 'summaryCarImage3'],
        titles: ['summaryCarTitle', 'summaryCarTitle2', 'summaryCarTitle3'],
        pickupDates: ['summaryPickupDate', 'summaryPickupDate2', 'summaryPickupDate3'],
        returnDates: ['summaryReturnDate', 'summaryReturnDate2', 'summaryReturnDate3'],
        pickupLocations: ['summaryPickupLocation', 'summaryPickupLocation2', 'summaryPickupLocation3'],
        days: ['summaryDays', 'summaryDays2', 'summaryDays3']
    };
    
    // Update images and titles
    summaryData.images.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.src = car.image;
    });
    
    summaryData.titles.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = car.name;
    });
    
    // Update dates and details
    summaryData.pickupDates.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = formatDate(pickupDate);
    });
    
    summaryData.returnDates.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = formatDate(returnDate);
    });
    
    summaryData.pickupLocations.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = pickupLocation;
    });
    
    summaryData.days.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = days + ' dní';
    });
    
    // Update pricing details
    document.getElementById('summaryDaysCount').textContent = days;
    document.getElementById('summaryCarPrice').textContent = totalPrice + '€';
    document.getElementById('summarySubtotal').textContent = totalPrice + '€';
    
    // Populate step 1 form fields with values from main form
    const step1PickupDate = document.getElementById('step1PickupDate');
    const step1ReturnDate = document.getElementById('step1ReturnDate');
    const step1PickupTime = document.getElementById('step1PickupTime');
    const step1ReturnTime = document.getElementById('step1ReturnTime');
    const step1PickupLocation = document.getElementById('step1PickupLocation');
    const step1ReturnLocation = document.getElementById('step1ReturnLocation');
    
    if (step1PickupDate) step1PickupDate.value = pickupDate;
    if (step1ReturnDate) step1ReturnDate.value = returnDate;
    if (step1PickupTime) step1PickupTime.value = pickupTime;
    if (step1ReturnTime) step1ReturnTime.value = returnTime;
    if (step1PickupLocation) step1PickupLocation.value = pickupLocationValue;
    if (step1ReturnLocation) step1ReturnLocation.value = returnLocationValue;
    
    // Add event listeners for date changes in step 1
    if (step1PickupDate) {
        step1PickupDate.addEventListener('change', updateStep1ReturnDateMin);
        step1PickupDate.addEventListener('change', updateReservationPricing);
    }
    if (step1ReturnDate) {
        step1ReturnDate.addEventListener('change', updateReservationPricing);
    }
    
    // Store reservation data
    window.reservationData = {
        carId: carId,
        car: car,
        pickupDate: pickupDate,
        returnDate: returnDate,
        pickupTime: pickupTime,
        returnTime: returnTime,
        pickupLocation: pickupLocation,
        pickupLocationValue: pickupLocationValue,
        returnLocationValue: returnLocationValue,
        days: days,
        basePrice: totalPrice
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Step Navigation
function nextStep(stepNumber) {
    // Hide current step
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show next step
    document.getElementById('step' + stepNumber).classList.add('active');
    document.querySelector('[data-step="' + stepNumber + '"]').classList.add('active');
    
    // Scroll to top of popup on mobile
    if (window.innerWidth <= 768) {
        const popup = document.querySelector('.reservation-steps-container');
        const popupContainer = document.querySelector('.reservation-steps-container .container');
        
        if (popup) {
            popup.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Also try scrolling the container itself
        if (popupContainer) {
            popupContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Small delay to ensure step transition is complete
        setTimeout(() => {
            if (popup) popup.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }
    
    if (stepNumber === 2) {
        initializeStep2();
    } else if (stepNumber === 3) {
        initializeStep3();
    }
}

function prevStep(stepNumber) {
    // Hide current step
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show previous step
    document.getElementById('step' + stepNumber).classList.add('active');
    document.querySelector('[data-step="' + stepNumber + '"]').classList.add('active');
}

function initializeStep2() {
    updateStep2Pricing();
}

function updateStep1ReturnDateMin() {
    const step1PickupDate = document.getElementById('step1PickupDate');
    const step1ReturnDate = document.getElementById('step1ReturnDate');
    
    if (step1PickupDate && step1ReturnDate && step1PickupDate.value) {
        const minReturnDate = new Date(step1PickupDate.value);
        minReturnDate.setDate(minReturnDate.getDate() + 1);
        step1ReturnDate.min = minReturnDate.toISOString().split('T')[0];
        
        if (step1ReturnDate.value <= step1PickupDate.value) {
            step1ReturnDate.value = minReturnDate.toISOString().split('T')[0];
        }
    }
}

function updateReservationPricing() {
    const step1PickupDate = document.getElementById('step1PickupDate');
    const step1ReturnDate = document.getElementById('step1ReturnDate');
    
    if (!step1PickupDate || !step1ReturnDate || !step1PickupDate.value || !step1ReturnDate.value) {
        return;
    }
    
    const pickupDate = step1PickupDate.value;
    const returnDate = step1ReturnDate.value;
    const days = calculateDaysBetween(pickupDate, returnDate);
    
    if (days <= 0) return;
    
    // Get current car data
    const carId = window.reservationData?.carId || 'kia-stonic';
    const car = carData[carId];
    if (!car) return;
    
    const dailyRate = calculateDailyRate(car, days);
    const totalPrice = days * dailyRate;
    
    // Update all summary displays
    const summaryData = {
        pickupDates: ['summaryPickupDate', 'summaryPickupDate2', 'summaryPickupDate3'],
        returnDates: ['summaryReturnDate', 'summaryReturnDate2', 'summaryReturnDate3'],
        days: ['summaryDays', 'summaryDays2', 'summaryDays3']
    };
    
    // Update dates and days
    summaryData.pickupDates.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = formatDate(pickupDate);
    });
    
    summaryData.returnDates.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = formatDate(returnDate);
    });
    
    summaryData.days.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = days + ' dní';
    });
    
    // Update pricing displays
    const summaryDaysCount = document.getElementById('summaryDaysCount');
    const summaryCarPrice = document.getElementById('summaryCarPrice');
    const summarySubtotal = document.getElementById('summarySubtotal');
    
    if (summaryDaysCount) summaryDaysCount.textContent = days;
    if (summaryCarPrice) summaryCarPrice.textContent = totalPrice + '€';
    if (summarySubtotal) summarySubtotal.textContent = totalPrice + '€';
    
    // Update reservation data
    if (window.reservationData) {
        window.reservationData.pickupDate = pickupDate;
        window.reservationData.returnDate = returnDate;
        window.reservationData.days = days;
        window.reservationData.basePrice = totalPrice;
    }
    
    // If we're on step 2, also update step 2 pricing
    const activeStep = document.querySelector('.step-content.active');
    if (activeStep && activeStep.id === 'step2') {
        updateStep2Pricing();
    }
}

function updateStep2Pricing() {
    const basePrice = window.reservationData.basePrice;
    const days = window.reservationData.days;
    
    let premiumInsurancePrice = 0;
    let servicesPrice = 0;
    
    // Calculate premium insurance
    const premiumInsurance = document.querySelector('input[name="insurance"][value="premium"]');
    if (premiumInsurance && premiumInsurance.checked) {
        premiumInsurancePrice = days * 15;
    }
    
    // Calculate services
    const gps = document.querySelector('input[name="services"][value="gps"]');
    const cleaning = document.querySelector('input[name="services"][value="cleaning"]');
    const delivery = document.querySelector('input[name="services"][value="delivery"]');
    const pickup = document.querySelector('input[name="services"][value="pickup"]');
    
    if (gps && gps.checked) servicesPrice += 15;
    if (cleaning && cleaning.checked) servicesPrice += 35;
    if (delivery && delivery.checked) servicesPrice += 5;
    if (pickup && pickup.checked) servicesPrice += 5;
    
    const totalPrice = basePrice + premiumInsurancePrice + servicesPrice;
    
    // Update display
    document.getElementById('step2CarPrice').textContent = basePrice + '€';
    
    const premiumInsuranceElement = document.getElementById('premiumInsurancePrice');
    if (premiumInsurancePrice > 0) {
        premiumInsuranceElement.style.display = 'flex';
        premiumInsuranceElement.querySelector('span:last-child').textContent = premiumInsurancePrice + '€';
    } else {
        premiumInsuranceElement.style.display = 'none';
    }
    
    const servicesElement = document.getElementById('servicesPrice');
    servicesElement.style.display = 'flex';
    servicesElement.querySelector('span:last-child').textContent = servicesPrice + '€';
    
    document.getElementById('step2TotalPrice').textContent = totalPrice + '€';
    
    // Update reservation data
    window.reservationData.premiumInsurancePrice = premiumInsurancePrice;
    window.reservationData.servicesPrice = servicesPrice;
    window.reservationData.totalPrice = totalPrice;
}

function initializeStep3() {
    const data = window.reservationData;
    
    // Build price breakdown
    let priceItemsHTML = `
        <div class="price-item">
            <span>Prenájom vozidla (${data.days} dní)</span>
            <span>${data.basePrice}€</span>
        </div>
    `;
    
    if (data.premiumInsurancePrice > 0) {
        priceItemsHTML += `
            <div class="price-item">
                <span>Prémiové poistenie</span>
                <span>${data.premiumInsurancePrice}€</span>
            </div>
        `;
    }
    
    priceItemsHTML += `
        <div class="price-item">
            <span>Dodatočné služby</span>
            <span>${data.servicesPrice}€</span>
        </div>
    `;
    
    document.getElementById('finalPriceItems').innerHTML = priceItemsHTML;
    document.getElementById('finalTotalPrice').textContent = data.totalPrice + '€';
}

function completeReservation() {
    // Validate personal info form
    const personalForm = document.getElementById('personalInfoForm');
    const termsAccepted = document.getElementById('termsAccepted');
    
    if (!personalForm.checkValidity()) {
        personalForm.reportValidity();
        return;
    }
    
    if (!termsAccepted.checked) {
        alert('Musíte súhlasiť s ochranou osobných údajov.');
        return;
    }
    
    const submitButton = document.querySelector('.confirm-btn');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Odosielanie...';
    
    // Prepare form data
    const formData = new FormData();
    
    // Personal info
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('birthDate', document.getElementById('birthDate').value);
    
    // Reservation data
    const data = window.reservationData;
    formData.append('carTitle', data.car.name);
    formData.append('pickupDate', data.pickupDate);
    formData.append('returnDate', data.returnDate);
    formData.append('pickupTime', data.pickupTime);
    formData.append('returnTime', data.returnTime);
    formData.append('pickupLocation', data.pickupLocationValue);
    formData.append('returnLocation', data.returnLocationValue);
    formData.append('totalDays', data.days);
    formData.append('totalPrice', data.totalPrice);
    formData.append('servicesPrice', data.servicesPrice || 0);
    formData.append('deposit', data.car.pricing.deposit || 500);
    
    // Get selected services
    const selectedServices = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
        selectedServices.push(checkbox.value);
    });
    formData.append('selectedServices', JSON.stringify(selectedServices));
    
    formData.append('termsAccepted', termsAccepted.checked);
    
    // Send to PHP script
    fetch('../reservation-form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            
            // Close modal and redirect
            document.getElementById('reservationSteps').style.display = 'none';
            document.body.style.overflow = 'auto';
            window.location.href = '../';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Došlo k chybe pri odosielaní rezervácie. Skúste to prosím neskôr.');
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.id === 'reservationSteps') {
        document.getElementById('reservationSteps').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close reservation steps function
function closeReservationSteps() {
    document.getElementById('reservationSteps').style.display = 'none';
    document.body.style.overflow = 'auto';
}