/*
	Problem Statement -
		● Implement a loading bar that animates from 0 to 100% in 3
		seconds.
		● Start loading bar animation upon a button click.
		● Queue multiple loading bars if the button is clicked more than
		once. Loading bar N starts animating with loading bar N-1 is
		done animating.
		● Follow up Start loading N bar after N-1 is half done (50%).
*/

let totalLoader = 0; // to keep count of total loaders requested
function generateLoader() {
  const fragment = document.createDocumentFragment();
  const container = document.getElementById("loaders");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.classList.add("load");
  // shadow loader to trigger next one at 50% of actual loader
  const shadowLoader = document.createElement("div");
  shadowLoader.classList.add("loader");
  shadowLoader.classList.add("load50");
  // append both inside fragment
  fragment.appendChild(shadowLoader);
  fragment.appendChild(loader);
  // trigger next one after shadow loader completed (same as 50% of actual loader i.e after 1.5s -> 3s for actual loader)
  shadowLoader.addEventListener("animationend", () => {
    totalLoader -= 1;
    document.getElementById("count").innerHTML = totalLoader;
    if (totalLoader > 0) generateLoader();
  });
  container.appendChild(fragment);
}
function addLoader() {
  // if no loader in queue generate loader
  if (totalLoader === 0) generateLoader();
  totalLoader += 1;
  document.getElementById("count").innerHTML = totalLoader;
}

/*
    ::HTML
        <button onclick="addLoader()">Click</button>
        <span id="count"></span>
        <div id="loaders"></div>
*/

/*
    ::CSS
        .loader{
        width: 100%;
        height: 10px;
        margin: 10px 0;
        border-radius: 10px;
        position: relative;
        background-color: #ededed;
        overflow: hidden;
        }
        .loader::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0px;
        background-color: aqua;
        }
        .loader.load::before {
        content: '';
        animation: load 3s ease-in-out forwards;
        }
        .load50{
        opacity: 0;
        }
        .loader.load50::before {
        content: '';
        animation: load 1.5s ease-in-out forwards;
        }
        @keyframes load{
        0%{
            width: 0px;
        }
        100%{
            width: 100%;
        }
        }
        @keyframes load50{
        0%{
            width: 0px;
        }
        100%{
            width: 50%;
        }
        }
*/