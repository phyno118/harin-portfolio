document.addEventListener('DOMContentLoaded', () => {
    // 1. 네비게이션 바 배경 스크롤 효과
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-0', 'bg-[#08080A]/80');
            navbar.classList.remove('bg-[#08080A]/60');
        } else {
            navbar.classList.remove('py-0', 'bg-[#08080A]/80');
            navbar.classList.add('bg-[#08080A]/60');
        }
    });

    // 2. 스크롤 등장 애니메이션 (Intersection Observer)
    // 요소가 화면에 15% 정도 보였을 때 'visible' 클래스를 추가합니다.
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 등장하면 다시 트리거되지 않도록 해제 (계속 움직이는 걸 방지)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    // '.fade-in-up' 클래스를 가진 모든 요소 추적 시작
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 3. 프로토타입 iframe 코드 주입 (데스크탑)
    const desktopIframe = document.getElementById('desktop-prototype-iframe');
    const desktopCode = document.getElementById('desktop-prototype-code');
    if (desktopIframe && desktopCode) {
        desktopIframe.srcdoc = desktopCode.value;
    }

    // 4. 프로토타입 iframe 코드 주입 (모바일/태블릿 반응형)
    const responsiveIframes = document.querySelectorAll('.prototype-iframe-responsive');
    const responsiveCode = document.getElementById('responsive-prototype-code');
    if (responsiveIframes.length > 0 && responsiveCode) {
        responsiveIframes.forEach(iframe => {
            iframe.srcdoc = responsiveCode.value;
        });
    }
});