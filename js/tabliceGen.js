
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

