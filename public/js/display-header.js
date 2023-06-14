let headerCtn = document.querySelector('header .header-container');
let htrClt = document.querySelector('.right-header .history-and-collect');
let boxCtn = document.querySelector('.history-and-collect .content-box');
let lgeCtn = document.querySelector('.right-header .language-container');
let hdeClt = document.querySelector('.language-container .header-collect');
let userSdWr = document.querySelector('.right-header .user-side-wrap');
let loginLtn = document.querySelector('.user-side-wrap .no-login-list');
let qrCdWr = document.querySelector('.right-header .qrcode-wrap');
let downWrpn = document.querySelector('.qrcode-wrap .download-new-wrapper');
let vipTg = document.querySelector('.right-header .vip-tag');
let vipPrvs = document.querySelector('.vip-tag .vip-privileges');
let inputSrc = document.querySelector('#searchForm #input-searchForm');
let srcListCtn = document.querySelector('.search-box .search-list-container');
// Xử lý nền header
handleHeaderBackground(headerCtn);

// Xử lý Search List
handleSearchList(headerCtn, inputSrc, srcListCtn);

// Xử lý Content Box History and Collect
handleMouseHover(htrClt, boxCtn);

// Xử lý Language Box
handleMouseHover(lgeCtn, hdeClt);

// Xử lý Login List
handleMouseHover(userSdWr, loginLtn);

// Xử lý Download Wrapper
handleMouseHover(qrCdWr, downWrpn);

// Xử lý Vip Privileges
handleMouseHover(vipTg, vipPrvs);
