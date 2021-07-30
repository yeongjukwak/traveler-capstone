<div align="center">
  
<img src="https://user-images.githubusercontent.com/77434165/121373300-eb400800-c979-11eb-9c40-bdcb44a1604b.png" width="300" height="70" align="center" />

</div>
  
## 주제
Map openAPI와 Unity를 활용하여 춘천 관광지 소개 및 경로 안내 및 가이드 웹 사이트 개발

## 목적
관광이란 일상이란 틀에서 벗어나 새로운 풍경과 경험을 하며 성장하는 과정이라고 생각합니다.<br>

다른 관광객들 또한 매일 있었던 곳보단 생소하고 자주 가보지 않았던 곳을 목적으로 관광할 것이며,<br>
기존의 관광 추천 사이트처럼 지도 위의 마커로만 표시된 곳에 위치를 찾는 것보다 길 찾기 기능을 구현하여 관광 사이트에 등록시키면 관광객들이 관광 조사단계 및 관광 중에 큰 시간 절약 및 편의성을 가져올 수 있다고 생각합니다.<br>

길 찾기 기능을 구현하는 것을 토대로,<br>
여러 목적지를 경유하는 길을 찾아주어 관광 시간 및 사전 조사 시간을 줄여주며,<br>
추가로 관광지별 360도 관광지 View를 통한 생생한 관광지 전경을 전달하는 것을 목표로 삼고 본 프로젝트를 진행하기 시작하였습니다.<br>

## 팀원 소개
- 팀명 : Traveler
- 팀원 : 곽영주, 최준민, 서주현
- 지도교수 : 이정근
- 참여기업 : SeedsSoft

[시연 영상](https://youtu.be/xC9cw0AmJks)

## 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/javaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jQuery&logoColor=white"/></a>

<img src="https://img.shields.io/badge/Unity-000000?style=flat-square&logo=Unity&logoColor=white"/></a>
<img src="https://img.shields.io/badge/C%23-00599C?style=flat-square" /></a>

## 오픈 소스 및 아이콘
<img src="https://img.shields.io/badge/TmapAPI-EA2300?style=flat-square" /></a>

<strong>[Icon]</strong><br>
[Freepik](https://www.freepik.com)<br>
[Pixel perfect](https://www.flaticon.com/authors/pixel-perfect)<br>
[Vitaly Gorbachev](https://www.flaticon.com/authors/vitaly-gorbachev)

## 개발 내용
<div align="center">
  
  ![클래스도](https://user-images.githubusercontent.com/77434165/127608137-222c7684-0967-4d4e-a5f4-d309ce2eb98f.png)
  <p><strong>클래스도</strong></p>
  <p align="left">
    프로젝트의 전체적인 설계를 구상한 부분입니다.<br> 여행지에 대한 정보<strong>(여행지명, 여행지 설명, 여행지 타입, 여행지 이미지의 주소, 지도에서 사용될 x,y좌표, view에서 사용될 빌드 패스 등)</strong>를
    <strong>trip_data.json</strong> 파일에 저장하고, 필요한 부분에서 꺼내오도록 구성하고, 각각 페이지 별로 필요한 동작들에 대한 메서드를 js파일에서 불러와 동작하도록 구현하였습니다.
  </p><br><br><hr>
  
  ![데이터 구조](https://user-images.githubusercontent.com/77434165/127608181-a2f68e63-74fa-431c-8d30-1ed90c738528.png)
  <p><strong>데이터 구조</strong></p>
  <p align="left">
    본 프로젝트의 데이터 흐름 모델 설계도입니다. 프로젝트는 <strong>MainPage.html</strong> 페이지를 포함한 3개의 페이지를 가지며,<br>
    각각 <strong>map.html</strong> 페이지의 핵심 기술은 경로 탐색 기능이고 <strong>view.html</strong> 페이지의 핵심 기술은 360도 관광지 View 기능입니다.<br>
    각 페이지의 검색 결과(관광지명)를 <strong>session storage</strong>를 사용하여 다음 페이지로 검색어 값을 보내주며,<br>
    검색어 값을 넘겨받은 페이지에서는 storage를 통해 값을 가져와서 정보를 표현하는 동작을 수행합니다.
    json파일의 경우, 관광지의 정보 및 좌표와 <strong>build path(360도 관광지 View)</strong>가 저장되어 있으며 json파일과의 연동은 ajax를 통해 이루어지고 있습니다.<br>
    ajax에서 json파일을 불러오는 것이 성공하면 <strong>session storage</strong>에서 받았던 관광지명과 json파일의 관광지명이 같은지 확인합니다.<br>
    만약 관광지명이 같으면, 그에 맞는 관광지의 데이터를 불러오는 방식으로 프로그램이 진행됩니다.
  </p><br><br><hr>
  
<div>
  
  ![image](https://user-images.githubusercontent.com/77434165/127609401-f43befec-7d9d-4c28-b8e5-4dab93247132.png)
  ![image](https://user-images.githubusercontent.com/77434165/127609415-a3c1ebf3-7e66-4081-8b66-83e44150e540.png)
  <p><strong>메인 페이지</strong></p>
  <p align="left">
    메인 페이지에서는 검색 창을 통하여 원하는 관광지를 검색하여 Map 페이지로 이동할 수 있으며, 하단부의 추천 관광지들을 클릭하면 View 페이지로 이동할 수 있습니다.<br>
    각 페이지로 이동할 때, <strong>session storage</strong>를 사용하여 클릭한 관광지나 검색 창을 통해 검색한 관광지명을 가지고 다음 페이지로 이동하도록 구현했습니다.<br>
    검색 기능 구현은 <strong>eventListener</strong>의 키보드 입력을 감지하는 <strong>onKeyUp</strong> 이벤트 함수가 true일 경우 json파일의 데이터들이 현 검색어와 일치하는지 수시로 확인하며,<br>
    false일 경우 검색어 입력이 완료되었다고 판단하여 마지막으로 작성한 검색어가 포함된 관광 리스트를 나열하도록 구성하였습니다.<br>
    그리고 관광 리스트를 보여주는 작업을 반복 진행하도록 동작하여 키보드를 누를 때마다 리스트가 갱신되어 검색어의 범위가 좁아지도록 구현하였습니다.<br>
    중앙 하단의 화살표를 누르거나 마우스를 스크롤 할 때마다 <strong>offset().top</strong>을 사용하여 각각의 화면을 한 번에 보여주도록 구현하였으며, 자연스럽게 동작하도록 <strong>animate</strong>를 추가하여 구현하였습니다.
  </p><br><br><hr>
  
</div>
  
<div>
  
  ![image](https://user-images.githubusercontent.com/77434165/127608605-61513ed4-3ce5-458b-bf8e-7c7ae540e75b.png)
  ![image](https://user-images.githubusercontent.com/77434165/127608628-2d63abba-2d6f-4228-bca1-0a61d4d582ee.png)
  ![image](https://user-images.githubusercontent.com/77434165/127608642-a157596c-927c-4349-8ba6-c929443f7b7d.png)
  <p><strong>경로 좌표를 연결한 모습 및 지도 페이지</strong></p>
  <p align="left">
    지도 (TMap)의 좌표 및 API를 사용한 경로 탐색 기술을 사용합니다.<br>
    지도 Map은 <strong>Open API key</strong>를 통하여 TMap의 지도 레이블을 받아올 수 있었으며, 경로는 출발지와 목적지를 Ajax를 통하여 넘겨주면,<br>
    출발지에서부터 목적지까지의 경로 좌표 데이터들을 배열로 반환받는 방식을 통하여 길을 그려주는 방식을 채택하여 사용하였습니다.<br>
    Map 페이지는 TMap openAPI 및 openAPI Key를 사용하여 Map을 생성했고, 좌측의 UI를 통하여 관광지를 검색하고 간단한 설명을 볼 수 있도록 구현하였습니다.<br>
    Map의 우측 상단의 총 거리 및 총 시간의 부분에서는, ajax에서 api의 json데이터를 통한 목적지 별 거리 및 시간을 가져오고 그 합을 계산하여 출력합니다.<br>
    Map의 좌측 상단 <strong>My Trip</strong>콘텐츠는 현재 자신이 선택한 관광지들을 리스트로 보여주는 부분입니다.<br>
    각 검색 결과마다 보이는 ‘담기’버튼을 클릭 시 나의 관광 리스트에 관광지가 추가되며,<br>
    ‘X’버튼을 통해 관광 리스트에서 지우고, 관광지명을 클릭하면 지도의 중심에 관광지를 위치시키며, 해당 관광지의 정보를 좌측 UI에 띄우도록 하였습니다.<br>
    관광지가 검색된 상태에서, ‘view’ 버튼을 누를 시, <strong>session storage</strong>로 관광지명을 저장하고 View 페이지로 이동하도록 설정하였습니다.
  </p><br><br><hr>
  
</div>
  
<div>
  
  ![image](https://user-images.githubusercontent.com/77434165/127608989-ceaca1b0-d890-4b9a-80e2-190fda106761.png)
  ![image](https://user-images.githubusercontent.com/77434165/127609010-cc316f0f-b6ab-402b-9aef-32c473c5b2f2.png)
  ![image](https://user-images.githubusercontent.com/77434165/127609013-705b2899-3b9c-4cc8-9cb0-30c240e35b84.png)
  <p><strong>사진, 동영상 가공 및 뷰 페이지</strong></p>
  <p align="left">
    360도 관광지 View는 Unity를 사용하여 구현하였으며, 물체의 material에 적용된 albedo를 내부와 바깥에서 보여지도록 만들어주는 <strong>insideOut.Shader</strong>를 수업 및 GitHub에서 참조하여 구체에 360도 관광지 사진을 입히고 구체 내부에서 카메라를 이용하여 바라보도록 함으로 뷰를 구현하였습니다.<br> 
    동영상으로 촬영 후 <strong>actiondirector</strong>을 사용하여 가공된 영상을 python을 통해 재가공하여 사진을 캡처하였습니다.<br>
    python <strong>open CV</strong> 중 <strong>createBackgroundSubtractorKNN</strong> 메서드를 사용하여 배경과 전경을 분리하였으며,<br>
    <strong>findContours</strong> 메서드를 사용하여 분리된 전경의 수가 0이 되는 순간에 영상을 캡처하는 프로그램을 제작하여 사진을 구했습니다.<br>
    View 페이지에선 Unity를 <strong>webGL</strong>로 빌드하여 웹 컨텐츠로 활용하였습니다.<br>
  </p><br><br><hr>
  
  ![image](https://user-images.githubusercontent.com/77434165/127611254-b0fd1487-1598-4408-8ee8-6bd629f6bd5f.png)
  <p><strong>일정표</strong></p>
  
</div>
  
</div>

## 활용방안 및 기대효과
본 프로젝트는 관광객들에게 춘천 관광지를 소개하고 길 안내를 효과적으로 돕는 웹 사이트입니다.<br>
관광객들은 본 웹 사이트를 사용함으로써 360도 관광지 View를 통하여 생생한 사전 조사가 가능해짐으로 관광의 만족도가 증가할 것입니다.<br>

길 찾기 서비스를 통한 관광 계획 및 관광 시간을 단축한다는 편의성을 경험할 수 있습니다.<br>
이러한 편의성은 춘천의 1차 관광객의 2, 3차 춘천 관광 확률 증가라는 기대 효과를 가지며,<br>
이는 춘천의 관광 수요 증가로 인한 각각 관광지별 소득이 증가하는 효과를 가져옵니다.<br>
또한, 관광 수요 증가는 춘천 사랑 상품권 제도의 적극적인 활용을 장려함으로써 각각 관광지별 지역 상권과 춘천 전체의 지역경제 활성화 효과를 누릴 수 있습니다.<br>

만약 본 프로젝트가 사업화 및 창업화가 진행된다면, 로그인 및 댓글 시스템을 추가하여 로그인 정보를 통한 개인 경로를 저장하여 열람하는 편리함을 제공하고,<br>
댓글 시스템을 통해 관광객과 상인을 간접적으로 연결하여 상인은 게시판 모니터링을 통해 관광객의 니즈를 파악 후 가격,<br>
품목 등을 조정하며 매출을 올리고, 관광객은 관광지 정보 공유를 통해 실패가 적은 관광지 선정이 가능해지는 Win-Win 전략을 통해 방문객 수를 유지할 예정입니다.<br>
저희는 방문객 수를 통한 광고 수익 혹은 관광지 입장료의 결제 대행 서비스를 통한 이익으로 사업을 계속하여 진행할 계획입니다.<br>
