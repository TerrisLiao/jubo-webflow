/**
 * 90-save-frame.jsx
 * 把目前 comp 的某一格存成 PNG，讓 agent 可以自己看結果。
 *
 * 這是本機 session 的視覺迴圈：改腳本 → 執行 → 存格 → 用 Read 工具打開 PNG → 再改。
 * 沒有這一步就是在盲寫。
 *
 * 要換時間點就改下面的 FRAME。存檔位置固定在桌面，方便 Read。
 *
 * 用法：
 *   run-script 執行 $.evalFile("<絕對路徑>/custom-code/poc/ae/90-save-frame.jsx");
 */
(function () {
    var FRAME = 20;                 // 要看第幾格（30fps 的話 20 格 ≈ 0.67s）
    var OUT   = "ae-frame.png";     // 存在桌面

    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        return "錯誤：沒有作用中的 comp。請先在專案面板點開一個 comp。";
    }

    var t = FRAME / comp.frameRate;
    if (t > comp.duration) {
        return "錯誤：第 " + FRAME + " 格超過 comp 長度（" + comp.duration + "s）。";
    }

    var f = new File(Folder.desktop.fsName + "/" + OUT);
    comp.saveFrameToPng(t, f);

    return "已存第 " + FRAME + " 格（" + t.toFixed(3) + "s）到 " + f.fsName +
           "\ncomp：" + comp.name + " " + comp.width + "×" + comp.height +
           " @ " + comp.frameRate + "fps，長 " + comp.duration + "s";
})();
