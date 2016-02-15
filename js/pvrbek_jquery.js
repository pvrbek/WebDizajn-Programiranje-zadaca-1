
        function focusBlurSet(element) {

            for (i = 0; i < element.length; i++)
            {
                element[i].addEventListener("focus", function() {
                    this.className = "crveno";
                });
                element[i].addEventListener("blur", function() {
                    this.className = "";
                });
            }
        }


input = document.getElementsByTagName("input");
textArea = document.getElementsByTagName("textarea");
select = document.getElementsByTagName("select");
label = document.getElementsByTagName("label");


focusBlurSet(input);
focusBlurSet(textArea);
focusBlurSet(select);


for (i = 0; i < label.length; i++)
{
    label[i].onmouseover = function() {
        this.className = "pozadinaCrveno";
    };
    label[i].onmouseout = function() {
        this.className = "";
    };
}


window.onload = function() {
    var forma = document.forms["registracija"];
    forma.addEventListener('submit', provjeri, false);
    var korIme = document.getElementById('korime');
    korIme.addEventListener('blur', provjeriUsername, false);
    var email = document.getElementById('email');
    email.addEventListener('blur', provjeriEmail, false);
};

function provjeriEmail() {

    var emailErr = document.getElementById('lblEmail');
    if (!this.value.match(/^[\w\-\.\+]+\@\bfoi\b\.\bhr\b$/)) {
        emailErr.className = "error";
        emailErr.innerHTML = "Nije dobar format";
        return;
    }
    var pronadjen = 1;
    $.ajax({
        type: "GET",
        url: "http://arka.foi.hr/WebDiP/2013/materijali/dz3_dio2/korisnikEmail.php?korisnik=" + this.value,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('korisnici').each(function() {
                var je_nije = $(this).find('korisnik').text();
                if ($(this).find('korisnik').text() === "1") {
                    pronadjen = 0;
                    var poruka = '<div id="poruka" class="high" title="KRIVI UNOS"><br/><br/><p>Duplikat!!!!!</p></div>';
                    $('#saddd').html(poruka);
                    $('#saddd').effect("highlight", {color: 'blue'}, 3000);

                    $('#saddd').dialog({
                        show: {effect: 'bounce', duration: 2000},
                        hide: {effect: 'explode', duration: 1000}
                    });
                }

                if (pronadjen === 1) {

                    emailErr.className = "";
                    emailErr.innerHTML = "";
                }
                else {
                    emailErr.className = "error";
                    emailErr.innerHTML = "Duplikat";
                }
            });
        }
    });
}

function provjeriUsername(user) {

    var korimeErr = document.getElementById('lblUsername');
    var pronadjen = 1;
    $.ajax({
        type: "GET",
        url: "http://arka.foi.hr/WebDiP/2013/materijali/dz3_dio2/korisnik.php?korisnik=" + this.value,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('korisnici').each(function() {
                var je_nije = $(this).find('korisnik').text();
                if ($(this).find('korisnik').text() === "1") {
                    pronadjen = 0;
                    var poruka = '<div id="poruka" class="high" title="KRIVI UNOS"><br/><br/><p>Duplikat!!!!!</p></div>';
                    $('#saddd').html(poruka);
                    $('#saddd').effect("highlight", {color: 'blue'}, 3000);

                    $('#saddd').dialog({
                        show: {effect: 'bounce', duration: 2000},
                        hide: {effect: 'explode', duration: 1000}
                    });
                }

                if (pronadjen === 1) {

                    korimeErr.className = "";
                    korimeErr.innerHTML = "";
                }
                else {
                    korimeErr.className = "error";
                    korimeErr.innerHTML = "Duplikat";
                }
            });
        }
    });
}


function provjeri(e) {

    var korimeErr = document.getElementById('lblUsername');
    var emailErr = document.getElementById('lblEmail');
    if (korimeErr.className === "error" || emailErr.className === "error") {
        e.preventDefault();
    }
    var ime = document.getElementById("ime");
    var prezime = document.getElementById("korpr");
    var lozinka = document.getElementById("lozinka1");
    var potvrda = document.getElementById("lozinka2");
    var spol = document.getElementById("spol");
    var uvjeti = document.getElementById("uvjetiUp");
    var imeErr = document.getElementById("lblIme");
    var prezimeErr = document.getElementById("lblPrezime");
    var spolErr = document.getElementById("lblSpol");
    var lozinkaErr = document.getElementById("lblLozinka");
    var potvrdaErr = document.getElementById("lblPotvrda");
    var uvjetiErr = document.getElementById("lblUvjeti");




    if (!(ime.value.match(/^[A-Za-z]+$/))) {
        //Nismo nista upisali
        if (ime.value.length === 0) {
            imeErr.className = "error";
            imeErr.innerHTML = "Ime je obavezno!";
            e.preventDefault();
        }
        else {
            imeErr.className = "error";
            imeErr.innerHTML = "Nema brojki";
            e.preventDefault();
        }
    }
    else {
        if (ime.value[0] !== ime.value[0].toUpperCase()) {
            ime.select();
            imeErr.className = "error";
            imeErr.innerHTML = "Veliko pocetno slovo";
            e.preventDefault();
        }
        else {
            imeErr.className = "";
            imeErr.innerHTML = "";

        }
    }

    if (!(prezime.value.match(/^[A-Za-z]+$/))) {
        if (prezime.value.length === 0) {
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Unesite prezime";
            e.preventDefault();
        }
        else {
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Samo slova";
            e.preventDefault();
        }
    }
    else {
        if (prezime.value[0] !== prezime.value[0].toUpperCase()) {
            prezime.select();
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Veliko slovo";
            e.preventDefault();
        }
        else {
            prezimeErr.className = "";
            prezimeErr.innerHTML = "";
        }
    }

    if (lozinka.value.length < 6) {
        lozinkaErr.className = "error";
        lozinkaErr.innerHTML = "Lozinka min 6 znakova!";
        e.preventDefault();
    }
    else {
        lozinkaErr.className = "";
        lozinkaErr.innerHTML = "";
    }

    if (lozinka.value !== potvrda.value) {
        potvrdaErr.className = "error";
        potvrdaErr.innerHTML = "Potvrda i lozinka moraju biti iste!";
        e.preventDefault();
    }
    else {
        potvrdaErr.className = "";
        potvrdaErr.innerHTML = "";
    }

    if (spol.value === "-1")
    {
        spolErr.className = "error";
        spolErr.innerHTML = "Spol nije odabran";
        e.preventDefault();
    }
    else {
        spolErr.className = "";
        spolErr.innerHTML = "";
    }
    if (uvjeti.checked) {
        uvjetiErr.className = "";
        uvjetiErr.innerHTML = "";
    }
    else {
        uvjetiErr.className = "error";
        uvjetiErr.innerHTML = "Morate prihvatiti uvjete!";
        e.preventDefault();
    }
}

$('#dgra').keyup(function() {
    var rezultat = new Array();
    $.getJSON('http://arka.foi.hr/WebDiP/2013/materijali/dz3_dio2/gradovi.json', function(data) {
        for (i = 0; i < data.length; i++) {
            rezultat[i] = data[i];
        }
    });

    $('#dgra').autocomplete({
        source: rezultat
    });
});



