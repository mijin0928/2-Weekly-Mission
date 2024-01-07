export const shareKakao = ({ title }, currentUrl) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init('abbd86379133e623416676a637862b22');
    }

    kakao.Link.sendDefault({
      objectType: "feed", 
      content: {
        title: `${title}`,
        description: `${title} 폴더 링크 목록`,
        imageUrl:
          "https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png",
        link: {
          mobileWebUrl: `${currentUrl}`,
          webUrl: `${currentUrl}`,
        },
      },
      buttons: [
        {
          title: "자세히 보러 가기",
          link: {
            mobileWebUrl: `${currentUrl}`,
            webUrl: `${currentUrl}`,
          },
        },
      ],
    });
  }
};