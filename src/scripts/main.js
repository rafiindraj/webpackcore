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

    class listMovie extends HTMLElement {
        connectedCallback() {
            this.renderAllMovie();
        }
        renderAllMovie(item){
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
    };
    customElements.define("listMovie", listMovie);

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {
        
        getmovie();
    });
}

export default main;