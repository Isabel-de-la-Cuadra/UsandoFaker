const { faker } = require('@faker-js/faker');
const { format, getCheckDigit } = require("rut.js");

/*
1- Crear repositorio remoto con Readme y gitignore incluido.
2- Clonar proyecto en su entorno local.
3- instalar la extensión faker. https://fakerjs.dev/guide/
4- Crear un ciclo que genere 10 personas aleatorias utilizando Faker. Se debe calcular la edad de cada persona.
5- Crear una función que muestre cuantas personas viven en cada ciudad.
6- Crear una función que genere un numero aleatorio de 8 digitos. y utilizando la dependencia rut.js obtener el dígito verificador. Se debe incluir esta función en la creación de los objetos de personas del requerimiento 4.
*/

// Array to save person
const people = [];

// Set current date
const today = new Date();

// Generate 10 person with fakerjs
for (let i = 0; i < 10; i++) {
    const person = {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z' }),
        city: faker.location.city(),
        nationalIdentityCard: faker.number.bigInt({ min: 10000000, max: 99999999 }),
    }

    // Calculate the check digit for nationalIdentityCard
    const nationalIdentityCardWithVerifier = person.nationalIdentityCard + getCheckDigit(person.nationalIdentityCard.toString());
    // Add nationalIdentityCardWithVerifier with format to person
    person.nationalIdentityCardWithVerifier = format(nationalIdentityCardWithVerifier);

    // Calculates the age of each person and then assigns that value to the property
    const age = calculateAge(person.birthdate, today);
    // Add age to person
    person.age = age;

    // Add person object to people array
    people.push(person);
}

console.log(people)

// Calculate the ages of people
for (let i = 0; i < people.length; i++) {
    const birthdate = people[i].birthdate;
    const age = calculateAge(birthdate, today);
    people[i].age = age;
}


// Print in console the name and age of each person
for (let i = 0; i < people.length; i++) {
    const person = people[i];
    console.log(`${person.name} ${person.lastName}, tiene ${person.age} años \n     ---------`);
}

// function that calculates age
function calculateAge(birthdate, today) {
    const birthYear = birthdate.getFullYear();
    const currentYear = today.getFullYear();
    let age = currentYear - birthYear;

    // Check if birthday hasn't happened yet this year
    const birthMonth = birthdate.getMonth();
    const currentMonth = today.getMonth();
    const birthDay = birthdate.getDate();
    const currentDay = today.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

// Function that records how many people in the array live in each city
function countPeopleByCity(people) {
    const cityCount = {};

    // Loop through the people array
    for (let i = 0; i < people.length; i++) {
        const city = people[i].city;

        // If the city is already registered, increment the counter
        if (cityCount.hasOwnProperty(city)) {
            cityCount[city]++;
        } else {
            // If the city is not registered, initialize the counter to 1
            cityCount[city] = 1;
        }
    }

    // Print the result to the console
    for (const city in cityCount) {
        console.log(`En la ciudad de ${city} viven ${cityCount[city]} personas.`);
    }
}

// Call the function to count people by city
countPeopleByCity(people);