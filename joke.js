const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

const getJoke = async () => {
    jokeContainer.classList.remove("fade");
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Handle single-part and two-part jokes
        if (data.type === "single") {
            jokeContainer.textContent = data.joke;
        } else if (data.type === "twopart") {
            jokeContainer.textContent = `${data.setup} ... ${data.delivery}`;
        } else {
            jokeContainer.textContent = "Unexpected joke format!";
        }

        jokeContainer.classList.add("fade");
    } catch (error) {
        jokeContainer.textContent = "Oops! Something went wrong. Please try again later.";
        console.error(error);
    }
};

// Add event listener to the button
btn.addEventListener("click", getJoke);

// Load a joke on page load
getJoke();
