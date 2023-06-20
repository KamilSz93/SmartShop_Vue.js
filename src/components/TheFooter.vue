<template>
  <div class="container-footer">
    <div class="container-list">
      <ul>
        <li>SmartShop FAKE</li>
        <li>O nas</li>
        <li>Kontakt</li>
        <li>Regulamin</li>
        <li>Kariera</li>
        <li>Forum</li>
        <li>Polityka cookies</li>
      </ul>
      <ul>
        <li>Promocje</li>
        <li>Okazja dnia</li>
        <li>Wakacyjna wyprzedarz</li>
        <li>W piątki -20%</li>
        <li>Drugi monitor -10%</li>
      </ul>
      <ul class="shop-list">
        <li>Zakupy</li>
        <li>Ubezpieczenie</li>
        <li>Raty</li>
        <li>Dostawa</li>
        <li>Zwrot i relamacje</li>
        <li>Płatności</li>
        <li>Leasing</li>
      </ul>
      <ul>
        <li>Kontakt</li>
        <li class="email-contact">
          <img
            class="email-icon"
            src="../components/icons/iconEmail.svg"
            alt="email-icon"
          />
          <div>smartshopfake@example.pl</div>
        </li>
        <li class="phone-number">
          <img
            class="phone-icon"
            src="../components/icons/iconPhone.svg"
            alt="phone-icon"
          />
          <div>12 3456 789</div>
        </li>
        <li class="opening-hours">
          <div>pon. - pt. <span>8:00 - 17:00</span></div>
          <div>sob. - nd. <span>8:00 - 12:00</span></div>
        </li>
        <div class="social-icon">
          <img
            class="yt-icon"
            src="../components/icons/iconYT.svg"
            alt="yt-icon"
          />
          <img
            class="fb-icon"
            src="../components/icons/iconFB.svg"
            alt="fb-icon"
          />
          <img
            class="instagram-icon"
            src="../components/icons/iconInstagram.svg"
            alt="instagram-icon"
          />
          <img
            class="twitter-icon"
            src="../components/icons/iconTwitter.svg"
            alt="twitter-icon"
          />
        </div>
      </ul>
    </div>
    <div class="footer-end">SmartShop FAKE 2020-2023</div>
  </div>
</template>

<script setup></script>

<style scoped>
.container-footer {
  position: relative;
  bottom: 0;
  width: 100%;
  padding-top: 3rem;
  margin: 3rem auto 0 auto;
  height: 48rem;
  background-color: var(--footerBackgroundColor);
  color: var(--textFooterColor);
}
.container-list {
  width: calc(100% - 24rem);
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
.container-list ul > li {
  list-style: none;
  margin-top: 2rem;
  font-size: 1.5rem;
}
.container-list ul li:not(:first-child) {
  font-weight: 500;
}
.container-list ul li:not(:first-child):hover {
  text-decoration: underline;
  cursor: pointer;
  color: white;
}
.container-list ul :first-child {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.4rem;
  color: #ffffff;
}
.phone-number {
  display: flex;
}
.phone-icon {
  margin-right: 1rem;
}
.container-list ul > li.opening-hours {
  margin-top: -0.5rem;
}
.opening-hours > div:nth-child(n) {
  margin: 0;
  font-weight: 200;
  margin-left: 2.5rem;
  font-size: 1.2rem;
  color: #898989;
}
.opening-hours > div:nth-child(n) span {
  font-weight: 300;
  margin-left: 1rem;
}
li .opening-hours > div:nth-child(n) {
  text-decoration: none;
}
.email-contact {
  display: flex;
}
.email-contact div {
  margin-left: 1rem;
}
.social-icon {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 3rem);
  margin-top: 2rem;
}
.social-icon > img:nth-child(n) {
  margin: 1rem;
}
.social-icon > img:nth-child(n):hover {
  cursor: pointer;
}
.footer-end {
  position: absolute;
  bottom: 1.8rem;
  margin: 0 auto;
  width: fit-content;
  left: calc(50% - 10rem);
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  color: white;
}
@media only screen and (max-width: 1200px) {
  .container-list {
    width: calc(100% - 3rem);
  }
  .social-icon {
    justify-content: center;
  }
}
@media only screen and (max-width: 700px) {
  .container-footer {
    height: fit-content;
  }
  .container-list {
    display: flex;
    flex-direction: column;
  }
  .container-list ul li {
    display: flex;
    justify-content: center;
  }
  .opening-hours > div:nth-child(n) {
    margin-top: 1rem;
  }
  .social-icon {
    width: 100%;
  }
  .social-icon > img:nth-child(n) {
    margin-right: 2rem;
  }
  .footer-end {
    position: static;
    margin-top: 2rem;
    padding-bottom: 2rem;
  }
}
@media only screen and (max-width: 480px) {
  .container-footer {
    width: 100%;
  }
}
</style>
