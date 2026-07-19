const params =
new URLSearchParams(
  window.location.search
);

const fileId =
params.get("id");

const from =
params.get("from");


const iframe =
document.getElementById(
  "drive-viewer"
);

const favoriteBtn =
document.getElementById(
  "favorite-btn"
);

const downloadBtn =
document.getElementById(
  "download-btn"
);

const commentsList =
document.getElementById(
  "comments-list"
);

const commentInput =
document.getElementById(
  "comment-input"
);

const commentBtn =
document.getElementById(
  "comment-btn"
);

const backButton =
document.getElementById(
  "viewer-home-button"
);


/* ==================================================
   HOME BUTTON
================================================== */

/*
  ROBÓTICA
*/

if(from === "robotica"){

  localStorage.setItem(
    "academicTab",
    "robotica-grid"
  );

  backButton.href =
  "pages/academico.html";

}


/*
  INFORMÁTICA
*/

else if(from === "informatica"){

  localStorage.setItem(
    "academicTab",
    "informatica-grid"
  );

  backButton.href =
  "pages/academico.html";

}


/*
  COMP APLICADA
*/

else if(from === "compaplicada"){

  localStorage.setItem(
    "academicTab",
    "comp-grid"
  );

  backButton.href =
  "pages/academico.html";

}


/*
  DESTIMECH
*/

else if(from === "destimech"){

  backButton.href =
  "index.html";

}


/*
  OUTRAS PÁGINAS
*/

else if(from){

  backButton.href =
  `pages/${from}.html`;

}


/*
  FALLBACK
*/

else{

  backButton.href =
  "index.html";

}


/* ==================================================
   VIEWER
================================================== */

iframe.src =
`https://drive.google.com/file/d/${fileId}/preview`;


/* ==================================================
   DOWNLOAD
================================================== */

downloadBtn.href =
`https://drive.google.com/uc?export=download&id=${fileId}`;


/* ==================================================
   FAVORITOS
================================================== */

let favorites =
JSON.parse(
  localStorage.getItem(
    "favorites"
  )
) || [];


if(
  favorites.includes(fileId)
){

  favoriteBtn.innerText =
  "⭐ Favoritado";

}


favoriteBtn.addEventListener(
  "click",
  () => {

    if(
      !favorites.includes(fileId)
    ){

      favorites.push(fileId);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      favoriteBtn.innerText =
      "⭐ Favoritado";

    }

  }
);


/* ==================================================
   COMMENTS
================================================== */

function loadComments(){

  const comments =
  JSON.parse(
    localStorage.getItem(fileId)
  ) || [];

  commentsList.innerHTML = "";

  comments.forEach(comment => {

    commentsList.innerHTML += `

      <div class="comment-card">

        ${comment}

      </div>

    `;

  });

}


commentBtn.addEventListener(
  "click",
  () => {

    const text =
    commentInput.value.trim();

    if(!text) return;

    const comments =
    JSON.parse(
      localStorage.getItem(fileId)
    ) || [];

    comments.push(text);

    localStorage.setItem(
      fileId,
      JSON.stringify(comments)
    );

    commentInput.value = "";

    loadComments();

  }
);


loadComments();