const NASA_API_BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=TpPfQUEZZ8v3aPpO3rGrg4ndHMbb4QmC9Ei18ysi";
const objUrlParams = new URLSearchParams(window.location.search);
imgDate = objUrlParams.get('date');

let uri = "";
if (imgDate) {
  uri = `${NASA_API_BASE_URL}&date=${imgDate}`;
  } else {
    uri = `${NASA_API_BASE_URL}`;
  }

async function showPicture() {
  fetch(uri)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      
      // Date
      const pDate = document.createElement("p");
      pDate.className = "metadata";
      const lblDate = document.createElement("span");
      lblDate.className = "label";
      lblDate.innerText = "Date: "
      const txtDate = document.createElement("span");
      txtDate.className = "data";
      txtDate.innerText = data.date;
      pDate.append(lblDate);
      pDate.append(txtDate);

      // Title
      const pTitle = document.createElement("p");
      pTitle.className = "metadata";
      const lblTitle = document.createElement("span");
      lblTitle.className = "label";
      lblTitle.innerText = "Title: "
      const txtTitle = document.createElement("span");
      txtTitle.className = "data";
      txtTitle.innerText = data.title;
      pTitle.append(lblTitle);
      pTitle.append(txtTitle);

      // Photographer
      const pPhotog = document.createElement("p");
      pPhotog.className = "metadata";
      const lblPhotog = document.createElement("span");
      lblPhotog.className = "label";
      lblPhotog.innerText = "Photographer: "
      const txtPhotog = document.createElement("span");
      txtPhotog.className = "data";
      txtPhotog.innerText = data.copyright;
      pPhotog.append(lblPhotog);
      pPhotog.append(txtPhotog);

      // Description
      const pDesc = document.createElement("p");
      pDesc.className = "metadata";
      const lblDesc = document.createElement("span");
      lblDesc.className = "label";
      lblDesc.innerText = "Description: "
      const txtDesc = document.createElement("span");
      txtDesc.className = "data";
      txtDesc.innerText = data.explanation;
      pDesc.append(lblDesc);
      pDesc.append(txtDesc);

      // Image and HD URL
      const container = document.querySelector("#apod");
      const link = document.createElement("a");
      link.href = data.hdurl;
      const image = document.createElement("img");
      image.className = "img_apod"
      image.src = data.url;
      link.append(image)
      
      container.append(pDate);
      container.append(pTitle);
      container.append(pPhotog);
      container.append(pDesc);
      container.append(link);   

    })
    .catch(err => console.error(err));
}

window.addEventListener('load', () => {
  showPicture();
});
