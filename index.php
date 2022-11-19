<?php
include('koneksi.php');
?>

<!DOCTYPE html>
<html>

<head>
    <title>Pencarian Data - Root93.co.id</title>
</head>

<body>
    <?php
    //proses validasi ketika terjadi permintaan pencarian
    $cari_err = "";
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (empty($_POST['cari'])) {
            $cari_err = "Masukan sebuah kata kunci untuk melakukan pencarian";
        } else {
            $cari = mysqli_real_escape_string($koneksi, ($_POST['cari']));
        }
    }
    ?>
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
        <input type="text" name="cari" size="50" placeholder="Masukan nama atau nis siswa yang ingin dicari">
        <br />
        <span style="color: red;"><?php echo $cari_err; ?></span><br>
        <input type="submit" name="kirim" value="Cari"><br />
    </form>
    <?php
    if (empty($cari_err)) {
        if (!empty($cari)) {
            $sql = "SELECT * FROM cari WHERE nama LIKE '%" . $cari . "%' or nisn LIKE '%" . $cari . "%' ";
            $perintah = mysqli_query($koneksi, $sql);
            //jika data yang dicari > 0 atau ada maka tampilkan 
            if (mysqli_num_rows($perintah) > 0) {
                echo '
    <p>Menampilkan hasil pencarian untuk ' . $cari . '
    <table width="500px" border="1">
    <tbody>
    <thead>
    <tr>
    <th>Nama</th>
    <th>Nisn</th>
    </tr>
    ';
                //kemudian lakukan perulangan
                while ($row = mysqli_fetch_array($perintah)) {
                    echo '
    <tr>
    <td>' . $row['nama'] . '</td>
    <td>' . $row['nisn'] . '</td>
    </tr>
    ';
                }
                echo '
    </tbody>
    </table>
    ';
            } else {
                echo "Maaf data $cari  tidak bisa kami temukan";
            }
        }
    }
    ?>
</body>

</html>