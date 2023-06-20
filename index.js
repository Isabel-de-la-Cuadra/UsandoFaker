const { faker, fakerES_MX } = require('@faker-js/faker');
const { format, getCheckDigit } = require("rut.js");

/*
1- Crear repositorio remoto con Readme y gitignore incluido.
2- Clonar proyecto en su entorno local.
3- instalar la extensión faker. https://fakerjs.dev/guide/
4- Crear un ciclo que genere 10 personas aleatorias utilizando Faker. Se debe calcular la edad de cada persona.
5- Crear una función que muestre cuantas personas viven en cada ciudad.
6- Crear una función que genere un numero aleatorio de 8 digitos. y utilizando la dependencia rut.js obtener el dígito verificador. Se debe incluir esta función en la creación de los objetos de personas del requerimiento 4.
*/

/*
1- Crear repositorio remoto con Readme y gitignore incluido.
2- Clonar proyecto en su entorno local.
3- intalar la extensión faker. https://fakerjs.dev/guide/
4- Dentro de una función crear un ciclo que genere 10 personas aleatorias utilizando Faker. Se debe calcular la edad de cada persona. (Id, Nombre, Apellido, Fecha Nacimiento, Ciudad)
5- Crear una función que muestre cuantas personas viven en cada ciudad.
6- Crear una función que genere un numero aleatorio de 8 digitos. y utilizando la dependencia rut.js obtener el dígito verificador. Se debe incluir esta función en la creación de los objetos de personas del requerimiento 4.
7- Obtener el promedio de edades.
8- Incluir el sexo en el registro de personas.
9- Crear una función que genere un totalizado de cuantas personas hay por cada sexo.
10- Ordenar el listado de ciudades de manera ascendente.
*/

// Array to save person
const people = [];

// Set current date
const today = new Date();

// Generate 10 person with fakerjs
for (let i = 0; i < 10; i++) {
    let sex = faker.person.sex();
    const person = {
        id: faker.string.uuid(),
        name: fakerES_MX.person.firstName(sex),
        lastName: fakerES_MX.person.lastName(),
        sex: sex,
        birthdate: faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z' }),
        city: fakerES_MX.location.city(),
        //city: faker.location.city(),
        nationalIdentityCard: faker.number.bigInt({ min: 10000000, max: 40000000 }),
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

// Function that calculates the average age
function calculateAverageAge(people) {
    let totalAge = 0;

    for (let i = 0; i < people.length; i++) {
        totalAge += people[i].age;
    }

    const averageAge = totalAge / people.length;
    return averageAge;
}

// Calculate the average age of people
const averageAge = calculateAverageAge(people);

// print the average age of the array to the console
console.log('---------------------------------')
console.log(`El promedio de edades es: ${averageAge}`);
console.log('---------------------------------')

// Function that calculates age
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

// Accountants for men and females
let maleCount = 0;
let femaleCount = 0;

// Loop through the people array
for (let i = 0; i < people.length; i++) {
    const person = people[i];

    // Check the value of 'sex' and increase the corresponding counter
    if (person.sex === 'male') {
        maleCount++;
    } else if (person.sex === 'female') {
        femaleCount++;
    }
}

// Print by console the number of men and female
console.log(`Cantidad de hombres: ${maleCount}`);
console.log(`Cantidad de mujeres: ${femaleCount}`);
console.log('---------------------------------')

// Function that counts how many people in the array live in each city and sorts them in ascending order
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

    // Sort the cities in ascending order
    const sortedCities = Object.keys(cityCount).sort();

    // Print the result to the console
    for (let i = 0; i < sortedCities.length; i++) {
        const city = sortedCities[i];
        console.log(`En la ciudad de ${city} viven ${cityCount[city]} personas.`);
    }
}

// Call the function to count people by city and sort the cities
countPeopleByCity(people);