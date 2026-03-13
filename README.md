# airsicknessbag

①terminalを起動する

②terminalに以下のコードを入力し、フォルダ位置を遷移する。

cd /Users/ryoikematsu/Documents/etiquette-bags

③スマホで撮影したheicファイルを、以下のコードを入力しjpgファイルに変換する。
python3 heic_to_jpg.py

（jpgファイルが作成されたことを確認し、heicファイルは削除しておく）

④Github内のimagesフォルダに追加したjpgファイルを追加する

⑤ドライブ内のスプレッドシートに追加したエチケット袋情報を追加する。

⑥スプシをcsv形式でダウンロードし、名称を “bags.csv” に変更した上で、書類→etiquette-bagsフォルダ内の既存フォルダと置換する。

⑦terminalに以下のコードを入力し、csvを元に “bags.json” を更新する。
python3 convert.py

⑧”bags.json” をGithubにアップロードし、既存の ”bags.json” を更新する。
