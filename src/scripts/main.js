function main() {

    const baseUrl = "https://api.themoviedb.org/3/list/1?api_key=501768670b68312d371b3a1143ac74be&language=en-US";

    const getmovie = () => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            debugger
            const responseJson = JSON.parse(this.responseText);
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllMovie(responseJson.items);
            }
        }

        xhr.onerror = function () {
            showResponseMessage();
        }

        xhr.open("GET", `${baseUrl}`);
        xhr.send();
    };


    class TimeFormatted extends HTMLElement { // (1)

        connectedCallback() {
            let date = new Date(this.getAttribute('datetime') || Date.now());

            this.innerHTML = new Intl.DateTimeFormat("default", {
                year: this.getAttribute('year') || undefined,
                month: this.getAttribute('month') || undefined,
                day: this.getAttribute('day') || undefined,
                hour: this.getAttribute('hour') || undefined,
                minute: this.getAttribute('minute') || undefined,
                second: this.getAttribute('second') || undefined,
                timeZoneName: this.getAttribute('time-zone-name') || undefined,
            }).format(date);
        }

    }

    customElements.define("time-formatted", TimeFormatted); // (2)
    const renderAllMovie = (items) => {
        const listMovieElement = document.querySelector("#listMovie");
        listMovieElement.innerHTML = "";

        items.forEach(item => {
            listMovieElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body content-body">
                            <h5 style='font-size:15px;'>ID: ${item.id}<br>Title: ${item.title}</h5>
                            <p>${item.overview.slice(0, 200)}...</p>
                            <p>Release Date: ${item.release_date}</p>
                            <p>Rate : ${item.popularity}%</p>
                        </div>
                    </div>
                </div>
            `;
        });

    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        getmovie();
    });
}

export default main;