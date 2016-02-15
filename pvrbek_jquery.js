if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="registracija_jquery.html"){
	//Funkcija koja postavlja listenera na određeni element koji je proslijeđen unutar parametra.
	//Stavlja listener na event focus i stavlja listener na event blur
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

	//Dohvacamo n elemenata tipa input, n elemenata tipa textarea i n elemenata tipa select
	input = document.getElementsByTagName("input");
	textArea = document.getElementsByTagName("textarea");
	select = document.getElementsByTagName("select");
	label = document.getElementsByTagName("label");

	//Postavljamo listenere na te elemente
	focusBlurSet(input);
	focusBlurSet(textArea);
	focusBlurSet(select);

	//Za labele i hover
	for (i = 0; i < label.length; i++)
	{
		label[i].onmouseover = function() {
			this.className = "pozadinaCrveno";
		}
		label[i].onmouseout = function() {
			this.className = "";
		}
	}


	window.onload = function() {
		var forma = document.forms["registracija"];
		forma.addEventListener('submit', provjeri, false);
		var korIme = document.getElementById('korime');
		korIme.addEventListener('blur', provjeriUsername, false);
		var email = document.getElementById('email');
		email.addEventListener('blur', provjeriEmail, false);
	};
}
else if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="prijava.html"){
	input = document.getElementsByTagName("input");
	label = document.getElementsByTagName("label");

	focusBlurSet(input);

	//Za labele i hover
	for (i = 0; i < label.length; i++)
	{
	    label[i].onmouseover = function() {
		this.className = "pozadinaCrveno";
	    }
	    label[i].onmouseout = function() {
		this.className = "";
	    }
	}
}
else if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="gen_korisnici_jquery.html"){
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#json').click(function() {
        $.getJSON('http://arka.foi.hr/WebDiP/2013/materijali/dz3_dio2/korisnici.json', function(data) {
            var tablica = $('<table id="tablica">');
            tablica.append('<thead><tr><th>Ime</th><th>Prezime</th><th>Email</th></tr></thead>');
            var tbody = $('<tbody>');
            for (i = 0; i < data.length; i++) {
                tbody.append('<tr><td>' + data[i].ime + '</td><td>' + data[i].prezime + '</td><td>' + data[i].email + '</td></tr>');
            }
            tablica.append(tbody);
            $('#content').html(tablica);
            $('#tablica').dataTable();
        });
    });
    $('#xml').click(function() {
        var tablica = $('<table id="tablica">');
        tablica.append('<thead><tr><th>ID korisnika</th><th>ID status</th><th>ID tip</th><th>Username</th><th>Ime</th><th>Prezime</th><th>Email</th><th>Slika</th><th>Aktivacijski</th><th>Neuspjesne prijave</th><th>Blokiran do</th><th>Lozinka</th></tr></thead>');
        var tbody = $('<tbody>');
        $.ajax({
            type: "GET",
            url: "http://arka.foi.hr/WebDiP/2013/materijali/dz3_dio2/korisnici.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('korisnik').each(function() {
                    tbody.append('<tr><td>' + $(this).attr('id_korisnik') + '</td><td>' + $(this).attr('id_status') + '</td><td>' + $(this).attr('id_tip') + '</td><td>' + $(this).attr('korisnicko_ime') + '</td><td>' + $(this).attr('ime') + '</td><td>' + $(this).attr('prezime') + '</td><td>' + $(this).attr('email') + '</td><td>' + $(this).attr('slika') + '</td><td>' + $(this).attr('aktivacijski_kod') + '</td><td>' + $(this).attr('neuspjesne_prijave') + '</td><td>' + $(this).attr('blokiran_do') + '</td><td>' + $(this).attr('lozinka') + '</td></tr>');
                });
                tablica.append(tbody);
                $('#content').html(tablica);
                $('#tablica').dataTable();
            }
        });
    });

});


}
else if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="korisnici_jquery.html"){
$(document).ready(function() {
    $('#korisnici').dataTable();
});
}
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

//Funkcija koja provjerava ispravan unos korisnickog imena i lozinke
function provjeri(e) {

    var korimeErr = document.getElementById('lblUsername');
    var emailErr = document.getElementById('lblEmail');
    if (korimeErr.className == "error" || emailErr.className == "error") {
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




    //Ne matcha regex
    if (!(ime.value.match(/^[A-Za-z]+$/))) {
        //Nismo nista upisali
        if (ime.value.length === 0) {
            imeErr.className = "error";
            imeErr.innerHTML = "Ime je obavezno!";
            e.preventDefault();
        }
        //Nismo upisali slova
        else {
            imeErr.className = "error";
            imeErr.innerHTML = "Nema brojki";
            e.preventDefault();
        }
    }
    //Matcha regex
    else {
        //Nismo upisali veliko pocetno slovo
        if (ime.value[0] !== ime.value[0].toUpperCase()) {
            ime.select();
            imeErr.className = "error";
            imeErr.innerHTML = "Veliko pocetno slovo";
            e.preventDefault();
        }
        //Ime je OK 
        else {
            imeErr.className = "";
            imeErr.innerHTML = "";

        }
    }

    //Ne matcha regex
    if (!(prezime.value.match(/^[A-Za-z]+$/))) {
        //Nismo nista upisali
        if (prezime.value.length === 0) {
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Unesite prezime";
            e.preventDefault();
        }
        //Nismo upisali slova
        else {
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Samo slova";
            e.preventDefault();
        }
    }
    //Matcha regex
    else {
        //Nismo upisali veliko pocetno slovo
        if (prezime.value[0] !== prezime.value[0].toUpperCase()) {
            prezime.select();
            prezimeErr.className = "error";
            prezimeErr.innerHTML = "Veliko slovo";
            e.preventDefault();
        }
        //Prezime je OK
        else {
            prezimeErr.className = "";
            prezimeErr.innerHTML = "";
        }
    }

    //Lozinka nema niti jedan upisani znak
    if (lozinka.value.length < 6) {
        lozinkaErr.className = "error";
        lozinkaErr.innerHTML = "Lozinka min 6 znakova!";
        e.preventDefault();
    }
    //Lozinka je OK
    else {
        lozinkaErr.className = "";
        lozinkaErr.innerHTML = "";
    }

    //Lozinka i potvrda lozinke nisu iste
    if (lozinka.value !== potvrda.value) {
        potvrdaErr.className = "error";
        potvrdaErr.innerHTML = "Potvrda i lozinka moraju biti iste!";
        e.preventDefault();
    }
    //Potvrda lozinke je OK
    else {
        potvrdaErr.className = "";
        potvrdaErr.innerHTML = "";
    }

    //Spol nije ok
    if (spol.value === "-1")
    {
        spolErr.className = "error";
        spolErr.innerHTML = "Spol nije odabran";
        e.preventDefault();
    }
    //Spol je OK
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



