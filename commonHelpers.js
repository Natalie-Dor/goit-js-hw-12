import{a as w,S,i as d}from"./assets/vendor-eded45c0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();async function g(t,r){const e="https://pixabay.com/api/",s={key:"43209712-864cbe761aaf2bd904c3cc70a",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return(await w.get(e,{params:s})).data}function M(t){const{id:r,largeImageURL:i,webformatURL:n,tags:e,likes:s,views:a,comments:E,downloads:b}=t;return`<li class="gallery-item data-id="${r}">
        <a class="gallery-link" href="${i}">
          <img
            class="gallery-image"
            width="360"
            height="200"
            src="${n}"
            data-source="${i}"
            alt="${e}"
          />
          <ul class="gallery-description">
            <li class="gallery-description-item"><span class="gallery-description-span">Likes</span>${s}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Views</span>${a}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Comments</span>${E}</li>
            <li class="gallery-description-item"><span class="gallery-description-span">Downloads</span>${b}</li>
          </ul>
        </a>
      </li>`}function p(t){return t.map(M).join("")}const f=new S(".gallery a",{captionsData:"alt",captionDelay:250}),o={formEl:document.querySelector(".search-form"),imgListEl:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector("[data-action=load-more]")};let l=1,h=0,c;const B=15;o.formEl.addEventListener("submit",$);o.loadMoreBtn.addEventListener("click",v);async function $(t){if(t.preventDefault(),o.imgListEl.innerHTML="",l=1,c=t.target.elements.query.value.trim(),!c)d.error({title:"Error",message:"The search field is empty. Please try again!",position:"bottomCenter"}),u();else{try{y();const r=await g(c,l);if(h=Math.ceil(r.totalHits/B),!r.hits.length)d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter"}),m(),u();else{const i=p(r.hits);o.imgListEl.insertAdjacentHTML("beforeend",i),f.refresh(),m(),L()}}catch(r){console.log(r)}o.formEl.reset()}}async function v(){l+=1,y();try{const t=await g(c,l),r=p(t.hits);o.imgListEl.insertAdjacentHTML("beforeend",r),f.refresh()}catch(t){console.log(t)}T(),m(),L()}function y(){o.loaderEl.classList.remove("is-hidden")}function m(){o.loaderEl.classList.add("is-hidden")}function P(){o.loadMoreBtn.classList.remove("is-hidden")}function u(){o.loadMoreBtn.classList.add("is-hidden")}function L(){l>=h?(u(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"})):P()}function T(){const t=o.imgListEL.firstChild.getBoundingClientRect().height;scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
