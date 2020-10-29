<script>
 
    //  HTML 문서가 준비되면 매개변수로 전달된 콜백 함수를 실행
    window.onload = () => {
        console.log("#1");
    };
 
    jQuery(document).ready(function() {
        console.log("#2");
    });
 
    $(document).ready(function() {
        console.log("#3");
    });
 
    jQuery(function() {
        console.log("#4");
    });
 
    $(function() {
        console.log("#5");
    });
    