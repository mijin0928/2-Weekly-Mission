export default function shareKakao(
  { title }: { title: string },
  currentUrl: string
) {
  if ((window as any).Kakao) {
    const kakao: any = (window as any).Kakao;

    if (!kakao.isInitialized()) {
      kakao.init('abbd86379133e623416676a637862b22');
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `${title}`,
        description: `${title} 폴더 링크 목록`,
        imageUrl:
          'https://developers.kakao.com/image/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png',
        link: {
          mobileWebUrl: `${currentUrl}`,
          webUrl: `${currentUrl}`,
        },
      },
      buttons: [
        {
          title: '자세히 보러 가기',
          link: {
            mobileWebUrl: `${currentUrl}`,
            webUrl: `${currentUrl}`,
          },
        },
      ],
    });
  }
}
