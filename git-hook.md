# Git Hooks 入門(初心者向け)

## 1. Git Hooks とは?

Git Hooks とは、**Git の操作(コミットや push など)のタイミングで、自動的にスクリプトを実行してくれる仕組み**です。

ポイントは 2 つだけです。

- Git に**標準で付いている機能**
- **自分のパソコンの中(ローカル)で動く**(サーバーには影響しない)

イメージ:

```
git commit を実行
      │
      ▼
🔔 フックが自動で動く(スクリプト実行)
      │
      ▼
コミットが完了する
```

>  Husky・Lefthook・[pre-commit](https://pre-commit.com/) は、hook のスクリプトを設定ファイルで簡単に書けるようにしてくれるツールです。

## 2. フックの種類

フックはたくさんありますが、名前のルールは簡単です。

- `pre-〇〇` = 〇〇の**前**に動く(失敗させると操作を止められる)
- `post-〇〇` = 〇〇の**後**に動く(お知らせ用)

よく使うものだけ覚えれば OK です。

| フック名 | 動くタイミング |
|---|---|
| `pre-commit` | コミットの**直前** |
| `commit-msg` | コミットメッセージを書いた**直後** |
| `post-commit` | コミットが**終わった後** |
| `pre-push` | push の**直前** |
| `post-merge` | マージが**終わった後** |

## 3. 実際に書いてみよう(メッセージを表示するだけ)

「コミットしたらメッセージを表示する」フックを、このプロジェクトの [lefthook.yml](lefthook.yml) にそのまま用意しています。中身はどれも 1 行の `echo` だけです。

```yaml
pre-commit:
  commands:
    demo:
      run: 'echo "これからコミットを行います!"'
```

構造はシンプルで 4 段だけです。

- `pre-commit`:どの**フック**で動かすか(2. の表にある名前)
- `commands`:このフックで実行するコマンド一覧(複数書ける)
- `demo`:コマンドの**名前**(自由に付けられる。例:`lint`、`format` など)
- `run`:実際に**実行するコマンド**(シェルコマンドをそのまま書く)

`commit-msg` / `post-commit` / `pre-push` も同じ形で書いてあります。

試してみましょう。

```sh
git commit -m "test"
```

結果:

```
 [pre-commit] これからコミットを行います!
 [commit-msg] コミットメッセージ!
 [post-commit] コミットが完了しました!
```

## 4. 何に使えるの?(実際の応用)

3. で見た `echo` は「表示するだけ」でしたが、フックの本当の力は**操作を止められる**ことにあります。

覚えることは 1 つだけです。

- コマンドが `exit 0`(正常終了)→ そのまま次に進む
- コマンドが `exit 1`(エラー終了)→ **そこで中止される**

`pre-〇〇` 系のフック(`pre-commit` / `pre-push` など)はこの仕組みを使って、「NG なら実行させない」という**門番**になれます。

### exit 1 で止まる例

試しに、必ず失敗する(exit 1 を返す)コマンドを `pre-commit` に足してみます。

```yaml
pre-commit:
  commands:
    block:
      run: |
        echo "❌ チェックNG!コミットを中止します"
        exit 1
```

```sh
git commit -m "test"
```

結果:

```
❌ チェックNG!コミットを中止します
husky - commit-msg hook exited with code 1 (error)
```

`exit 1` を返したコマンドがあると、**コミット自体が作られずに終わる**のがポイントです(`git log` にも残りません)。

### 実際のプロジェクトでの使い方

実際には「必ず失敗する」コマンドの代わりに、**NG のときだけ exit 1 を返すチェック**を書きます。**うっかりミスをリモートに上げる前に、ローカルで止めてくれる門番**として使うのが一番の応用です。

| フック | チェック内容 |
|---|---|
| `pre-commit` | Lint / フォーマット → NG ならコミット中止 |
| `commit-msg` | メッセージが `feat: 〇〇` 形式か → 形式違反なら中止 |
| `pre-push` | テスト実行 → 失敗なら push 中止 |

このプロジェクトには `yarn lint` / `yarn format:check` があるので、例えばこう組めます([package.json](package.json))。

```yaml
pre-commit:
  commands:
    lint:
      run: yarn lint
    format:
      run: yarn format:check

commit-msg:
  commands:
    check-format:
      run: |
        grep -qE '^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+' {1} || {
          echo "❌ コミットメッセージは 'feat: 〇〇' のような形式にしてください"
          exit 1
        }
```

`yarn lint` や `grep` のコマンド自体が NG のときに exit 1 を返してくれるので、上の例のように書くだけで自動的に「門番」になります。

もしテストを追加する場合は `pre-push` に `run: yarn test` のような形で足せば OK です。
