/**
 * 00-dump-effects.jsx
 * 把這台 AE 上所有可用效果的 matchName dump 出來。
 *
 * 為什麼需要：套效果要用 matchName 不是顯示名稱。
 * addProperty("Glow") 在非英文介面會失敗，addProperty("ADBE Glo2") 不會。
 * 與其憑記憶猜，不如在這台機器上實際問一次。
 *
 * 用法（在 Claude Code 裡）：
 *   run-script 執行 $.evalFile("<絕對路徑>/custom-code/poc/ae/00-dump-effects.jsx");
 * 結果會寫到桌面的 ae-effects.txt，也會直接回傳前 40 筆。
 */
(function () {
    var lines = [];
    var i, e;
    for (i = 0; i < app.effects.length; i++) {
        e = app.effects[i];
        lines.push(e.displayName + "\t" + e.matchName + "\t" + e.category);
    }
    lines.sort();

    var f = new File(Folder.desktop.fsName + "/ae-effects.txt");
    f.open("w");
    f.encoding = "UTF-8";
    f.write(lines.join("\n"));
    f.close();

    // 常用的幾個先挑出來，省得翻整份
    var want = ["glow", "blur", "ramp", "fill", "tint", "wipe", "levels", "curves"];
    var picked = [];
    for (i = 0; i < lines.length; i++) {
        var low = lines[i].toLowerCase();
        for (var j = 0; j < want.length; j++) {
            if (low.indexOf(want[j]) !== -1) { picked.push(lines[i]); break; }
        }
    }

    return "共 " + app.effects.length + " 個效果，完整清單寫到 " + f.fsName +
           "\n\n常用的：\n" + picked.slice(0, 40).join("\n");
})();
