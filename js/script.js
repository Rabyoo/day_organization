let paragraphCount = 1;

// إضافة فقرة جديدة
function addParagraph() {
  paragraphCount++;
  const paragraphsDiv = document.getElementById("paragraphs");
  const div = document.createElement("div");
  div.className = "paragraph";
  div.innerHTML = `
          <div style=" display: flex; justify-content: space-between;">
            <input style=" margin-left: 20px; " type="text" class="para-title" placeholder="اسم الفقرة ${paragraphCount}" />
            <input type="text" class="para-explainer" placeholder="الخادم ${paragraphCount}" />
          </div>
        `;
  paragraphsDiv.appendChild(div);
}

// دالة لتوليد الصورة باستخدام canvas
// دالة لتوليد الصورة باستخدام canvas
function generateCanvasImage() {
  const day = document.getElementById("day").value;
  const date = document.getElementById("date").value;
  const dayName = document.getElementById("dayName").value;
  const dayManager = document.getElementById("dayManager").value;
  const paragraphs = document.querySelectorAll(".paragraph");
  const comments = document.getElementById("comments").value;

  // إعداد canvas
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const margin = 25;
  const width = 700;
  const height = 600;
  canvas.width = width;
  canvas.height = height;

  // تحديد الخطوط
  ctx.font = "bold 26px Arial"; // تحديد الخط ليكون عريضًا
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  // تحميل الصورة كخلفية
  const backgroundImage = new Image();
  const imagePath = "/imgs/Cross_2.jpg"; // ضع هنا مسار الصورة

  if (!imagePath.endsWith(".jpg")) {
    console.error("الرجاء استخدام صورة بصيغة JPG فقط.");
    alert("الرجاء استخدام صورة بصيغة JPG فقط.");
    return;
  }

  backgroundImage.src = imagePath;
  backgroundImage.onload = function () {
    // رسم الصورة كخلفية
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    let yPosition = margin;

    // كتابة العناوين
    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "#fff"; // اللون الأبيض للعنوان
    ctx.fillText("اليوم: " + day, width / 2, yPosition);
    yPosition += 30;
    ctx.fillText("التاريخ: " + date, width / 2, yPosition);
    yPosition += 30;
    ctx.fillText("اسم اليوم: " + dayName, width / 2, yPosition);
    yPosition += 30;
    ctx.fillText("مسؤل اليوم: " + dayManager, width / 2, yPosition);
    yPosition += 40;

    // إضافة الفقرات إلى canvas
    ctx.font = "bold 26px Cairo"; // تحديد الخط ليكون عريضًا
    paragraphs.forEach((paragraph) => {
      const title = paragraph.querySelector(".para-title").value;
      const explainer = paragraph.querySelector(".para-explainer").value;

      if (title && explainer) {
        ctx.fillStyle = "gold"; // لون الفقرة ذهبي
        ctx.fillText(title + "✅ ", width / 4, yPosition); // اسم الفقرة على اليسار
        ctx.fillStyle = "#eee"; // لون الخادم
        ctx.fillText(explainer, (width / 4) * 3, yPosition); // الخادم على اليمين
        yPosition += 38; // المسافة بين الفقرات أقل قليلاً
      }
    });

    // إضافة التعليق (إذا كان موجودًا)
    if (comments) {
      yPosition += 40;
      ctx.font = "italic bold 18px Arial";
      ctx.fillStyle = "#e2e2e2"; // لون مريح للعين للتعليقات
      ctx.fillText("ملحوظة: " + comments, width / 2, yPosition);
    }

    // تنزيل الصورة
    const imageUrl = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "table_image.jpg";
    link.click();
  };

  backgroundImage.onerror = function () {
    console.error("فشل تحميل الصورة. الرجاء التحقق من المسار.");
    alert("فشل تحميل الصورة. الرجاء التحقق من المسار.");
  };
}

