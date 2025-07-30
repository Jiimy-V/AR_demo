import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    console.log("🚀 初始化 MindAR...");

    // ✅ 確保 .mind 檔案正確載入
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/40bcc53c-c06e-4f95-90e5-e453b7b44aaf/beafnoodle.mind?v=1747649901674",
      filterMinCF: 0.0001,  // 追蹤平滑參數，數字越小越平滑
      filterBeta: 0.001,    // 追蹤平滑參數，數字越小越平滑
    });

    const { renderer, scene, camera } = mindarThree;

    // ✅ 加入光源，讓牛肉麵變亮
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 🌟 環境光，提供整體亮度
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // ☀️ 模擬太陽光
    directionalLight.position.set(1, 2, 3); // 調整光源位置

    scene.add(ambientLight);
    scene.add(directionalLight);

    console.log("💡 已加入光源！");

    // ✅ 創建 Anchor（標記偵測到時的 3D 物件容器）
    const anchor = mindarThree.addAnchor(0);

    // ✅ 加載 GLTF 牛肉麵模型
    const loader = new GLTFLoader();
    loader.load(
      "https://cdn.glitch.global/40bcc53c-c06e-4f95-90e5-e453b7b44aaf/beafnoodle.glb?v=1747640354907",
      (gltf) => {
        const beafnoodle = gltf.scene;
        beafnoodle.scale.set(1, 1, 1); // ✅ 調整模型大小
        beafnoodle.position.set(0, 0, 0); // ✅ 讓牛肉麵站在標記的中間
        beafnoodle.rotation.set(0.8, 0, 0); // ✅ 調整模型角度
        anchor.group.add(beafnoodle);

        console.log("✅ 牛肉麵模型成功載入！");

        // ✅ 讓牛肉麵旋轉（增加互動感）
        function animate() {
          requestAnimationFrame(animate);
          beafnoodle.rotation.y += 0.002; // 旋轉
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("❌ 無法載入牛肉麵模型", error);
      }
    );

    // ✅ 啟動 AR
    try {
      console.log("🚀 正在啟動 MindAR...");
      await mindarThree.start();
      console.log("✅ MindAR 啟動成功！");
    } catch (error) {
      console.error("❌ MindAR 無法啟動", error);
      return;
    }

    // ✅ 設定渲染迴圈
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});

/*
    // ✅ 加入光源，讓牛肉麵變亮
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 🌟 環境光，提供整體亮度
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // ☀️ 模擬太陽光
    directionalLight.position.set(1, 2, 3); // 調整光源位置

    scene.add(ambientLight);
    scene.add(directionalLight);

    console.log("💡 已加入光源！");
*/
