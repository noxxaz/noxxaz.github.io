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
      // Display selected date on page
      let selDate = new Date(data.date);
      const displayDate = document.querySelector('#date');
      displayDate.innerText = selDate.toISOString().split('T')[0];

      // Build navigator links
      // Prev
      let prevDate = new Date(data.date);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevLink = document.querySelector('#prev');
      prevLink.href = "index.html?date=" + prevDate.toISOString().split('T')[0];

      // Next
      const nextLink = document.querySelector('#next');
      if (selDate === new Date()) {
        nextLink.href = "#";
      } else {
        let nextDate = new Date(data.date);
        nextDate.setDate(selDate.getDate() + 1);
        nextLink.href = "index.html?date=" + nextDate.toISOString().split('T')[0];
      }

      // Display metadata & photo
      // Date
      const pDate = document.createElement("p");
      pDate.className = "metadata";
      const lblDate = document.createElement("span");
      lblDate.className = "label";
      lblDate.innerText = "Date: ";
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

      // Video or Image + HD URL
      const container = document.querySelector("#apod");
      let media;
      if (data.media_type === "video") {
        media = document.createElement("iframe");
        media.width = 640;
        media.height = 360;
        media.src = data.url;
      } else {
        media = document.createElement("a")
        media.href = data.hdurl;
        const image = document.createElement("img");
        image.className = "img_apod"
        image.src = data.url;
        media.append(image)
      }
      
      container.append(pDate);
      container.append(pTitle);
      container.append(pPhotog);
      container.append(pDesc);
      container.append(media);   

    })
    .catch(err => console.error(err));
}

window.addEventListener('load', () => {
  showPicture();
});
