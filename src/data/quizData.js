// Quiz data cho từng giai đoạn lịch sử Đảng Cộng sản Việt Nam

const QUIZ_DATA = {
  // Quiz cho MOOC Thành lập Đảng Cộng sản Việt Nam
  'p1-m1': [
    {
      id: 'p1-m1-q1',
      text: 'Đảng Cộng sản Việt Nam được thành lập vào thời gian nào?',
      options: [
        { value: 'A', label: 'Ngày 3/2/1931' },
        { value: 'B', label: 'Ngày 3/2/1930' },
        { value: 'C', label: 'Ngày 2/9/1945' },
        { value: 'D', label: 'Ngày 11/11/1929' }
      ],
      correct: 'B',
      explanation: 'Đảng Cộng sản Việt Nam được thành lập ngày 3/2/1930 tại Hồng Kông dưới sự chủ trì của Nguyễn Ái Quốc.'
    },
    {
      id: 'p1-m1-q2',
      text: 'Hội nghị hợp nhất các tổ chức cộng sản được tổ chức tại đâu?',
      options: [
        { value: 'A', label: 'Quảng Châu (Trung Quốc)' },
        { value: 'B', label: 'Hồng Kông' },
        { value: 'C', label: 'Xiêm (Thái Lan)' },
        { value: 'D', label: 'Hà Nội' }
      ],
      correct: 'B',
      explanation: 'Hội nghị thành lập Đảng diễn ra tại Cửu Long, Hồng Kông từ ngày 6/1 đến 7/2/1930.'
    },
    {
      id: 'p1-m1-q3',
      text: 'Việc thành lập Đảng Cộng sản Việt Nam có ý nghĩa như thế nào?',
      options: [
        { value: 'A', label: 'Đưa phong trào yêu nước Việt Nam sang một giai đoạn mới' },
        { value: 'B', label: 'Chấm dứt chế độ thực dân Pháp ở Việt Nam' },
        { value: 'C', label: 'Làm Việt Nam trở thành nước độc lập' },
        { value: 'D', label: 'Thành lập chính phủ đầu tiên của Việt Nam' }
      ],
      correct: 'A',
      explanation: 'Sự kiện thành lập Đảng là bước ngoặt vĩ đại, chấm dứt khủng hoảng về đường lối cứu nước, mở ra thời kỳ mới cho cách mạng Việt Nam.'
    },
    {
      id: 'p1-m1-q4',
      text: 'Cương lĩnh chính trị đầu tiên của Đảng do ai khởi thảo?',
      options: [
        { value: 'A', label: 'Trần Phú' },
        { value: 'B', label: 'Lê Hồng Phong' },
        { value: 'C', label: 'Nguyễn Ái Quốc' },
        { value: 'D', label: 'Võ Nguyên Giáp' }
      ],
      correct: 'C',
      explanation: 'Nguyễn Ái Quốc (Hồ Chí Minh) đã chủ trì hội nghị và khởi thảo Cương lĩnh chính trị đầu tiên của Đảng.'
    },
    {
      id: 'p1-m1-q5',
      text: 'Hội nghị Trung ương lần thứ nhất (10/1930) đổi tên Đảng thành:',
      options: [
        { value: 'A', label: 'Đảng Cộng sản Đông Dương' },
        { value: 'B', label: 'Đảng Lao động Việt Nam' },
        { value: 'C', label: 'Đảng Cộng sản Việt Nam' },
        { value: 'D', label: 'Đảng Xã hội Việt Nam' }
      ],
      correct: 'A',
      explanation: 'Hội nghị Trung ương lần thứ nhất (10/1930) đổi tên Đảng Cộng sản Việt Nam thành Đảng Cộng sản Đông Dương.'
    }
  ],
  // Quiz cho MOOC Bảng Tuyên ngôn Độc lập
  'p1-m2': [
    {
      id: 'p1-m2-q1',
      text: 'Bác Hồ đọc Tuyên ngôn Độc lập vào ngày nào?',
      options: [
        { value: 'A', label: '2/9/1930' },
        { value: 'B', label: '19/5/1945' },
        { value: 'C', label: '2/9/1945' },
        { value: 'D', label: '2/9/1946' }
      ],
      correct: 'C',
      explanation: 'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội.'
    },
    {
      id: 'p1-m2-q2',
      text: 'Trong Tuyên ngôn Độc lập, Bác Hồ đã trích dẫn hai bản tuyên ngôn nào?',
      options: [
        { value: 'A', label: 'Tuyên ngôn Nhân quyền và Dân quyền (Pháp) và Tuyên ngôn Độc lập (Mỹ)' },
        { value: 'B', label: 'Hiến pháp Mỹ và Tuyên ngôn Nhân quyền của Liên Hợp Quốc' },
        { value: 'C', label: 'Tuyên ngôn Cộng sản và Hiến pháp Pháp' },
        { value: 'D', label: 'Tuyên ngôn của Anh và Mỹ' }
      ],
      correct: 'A',
      explanation: 'Trong Tuyên ngôn Độc lập, Bác Hồ đã trích dẫn Tuyên ngôn Nhân quyền và Dân quyền của Pháp và Tuyên ngôn Độc lập của Mỹ để khẳng định quyền tự do, độc lập của dân tộc Việt Nam.'
    },
    {
      id: 'p1-m2-q3',
      text: 'Sự kiện Bác Hồ đọc Tuyên ngôn Độc lập đánh dấu điều gì?',
      options: [
        { value: 'A', label: 'Cách mạng Tháng Tám thắng lợi' },
        { value: 'B', label: 'Sự ra đời của Nhà nước Việt Nam Dân chủ Cộng hòa' },
        { value: 'C', label: 'Kết thúc Chiến tranh thế giới thứ hai' },
        { value: 'D', label: 'Pháp công nhận độc lập cho Việt Nam' }
      ],
      correct: 'B',
      explanation: 'Tuyên ngôn Độc lập đánh dấu sự ra đời của nước Việt Nam Dân chủ Cộng hòa - nhà nước của dân, do dân và vì dân đầu tiên ở Đông Nam Á.'
    },
    {
      id: 'p1-m2-q4',
      text: 'Ý nghĩa lịch sử của bản Tuyên ngôn Độc lập là gì?',
      options: [
        { value: 'A', label: 'Khẳng định nền độc lập và chủ quyền của dân tộc Việt Nam' },
        { value: 'B', label: 'Đánh bại thực dân Pháp xâm lược' },
        { value: 'C', label: 'Mở đầu cuộc kháng chiến chống Mỹ' },
        { value: 'D', label: 'Thống nhất đất nước' }
      ],
      correct: 'A',
      explanation: 'Tuyên ngôn Độc lập khẳng định nền độc lập và chủ quyền của dân tộc Việt Nam, chấm dứt ách thống trị thực dân và phong kiến, mở ra kỷ nguyên độc lập, tự do.'
    }
  ],

  // Quiz cho MOOC Đại hội II của Đảng
  'p2-m1': [
    {
      id: 'p2-m1-q1',
      text: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng được tổ chức vào thời gian nào?',
      options: [
        { value: 'A', label: 'Tháng 1 năm 1951' },
        { value: 'B', label: 'Tháng 2 năm 1951' },
        { value: 'C', label: 'Tháng 3 năm 1951' },
        { value: 'D', label: 'Tháng 5 năm 1951' }
      ],
      correct: 'B',
      explanation: 'Tháng 2 năm 1951, Đại hội đại biểu toàn quốc lần thứ II của Đảng được tổ chức tại Hà Nội.'
    },
    {
      id: 'p2-m1-q2',
      text: 'Đại hội II của Đảng diễn ra tại đâu?',
      options: [
        { value: 'A', label: 'Việt Trì (Phú Thọ)' },
        { value: 'B', label: 'Tân Trào (Tuyên Quang)' },
        { value: 'C', label: 'Vinh Quang (Kim Bình, Chiêm Hóa, Tuyên Quang)' },
        { value: 'D', label: 'Pác Bó (Cao Bằng)' }
      ],
      correct: 'C',
      explanation: 'Đại hội II của Đảng diễn ra tại Vinh Quang (Kim Bình, Chiêm Hóa, Tuyên Quang).'
    },
    {
      id: 'p2-m1-q3',
      text: 'Sau Đại hội II, Đảng chính thức hoạt động công khai với tên gọi nào?',
      options: [
        { value: 'A', label: 'Đảng Cộng sản Đông Dương' },
        { value: 'B', label: 'Đảng Lao động Việt Nam' },
        { value: 'C', label: 'Đảng Dân chủ Việt Nam' },
        { value: 'D', label: 'Mặt trận Việt Minh' }
      ],
      correct: 'B',
      explanation: 'Sau Đại hội II, Đảng chính thức hoạt động công khai với tên gọi Đảng Lao động Việt Nam.'
    },
    {
      id: 'p2-m1-q4',
      text: 'Ai được bầu làm Chủ tịch Đảng và Tổng Bí thư tại Đại hội II?',
      options: [
        { value: 'A', label: 'Hồ Chí Minh – Lê Duẩn' },
        { value: 'B', label: 'Trường Chinh – Phạm Văn Đồng' },
        { value: 'C', label: 'Hồ Chí Minh – Trường Chinh' },
        { value: 'D', label: 'Võ Nguyên Giáp – Hồ Chí Minh' }
      ],
      correct: 'C',
      explanation: 'Hồ Chí Minh được bầu làm Chủ tịch Đảng và Trường Chinh được bầu làm Tổng Bí thư tại Đại hội II.'
    }
  ],
  // Quiz cho MOOC Chiến thắng Điện Biên Phủ
  'p2-m2': [
    {
      id: 'p2-m2-q1',
      text: 'Chiến dịch Điện Biên Phủ diễn ra trong thời gian nào?',
      options: [
        { value: 'A', label: '13/3 – 7/5/1954' },
        { value: 'B', label: '7/5 – 13/7/1954' },
        { value: 'C', label: '19/12/1953 – 7/5/1954' },
        { value: 'D', label: '2/9/1954 – 7/5/1955' }
      ],
      correct: 'A',
      explanation: 'Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954.'
    },
      {
        id: 'p2-m2-q2',
        text: 'Chỉ huy trưởng của Quân đội Nhân dân Việt Nam trong Chiến dịch Điện Biên Phủ là ai?',
        options: [
          { value: 'A', label: 'Trường Chinh' },
          { value: 'B', label: 'Võ Nguyên Giáp' },
          { value: 'C', label: 'Nguyễn Chí Thanh' },
          { value: 'D', label: 'Hoàng Văn Thái' }
        ],
        correct: 'B',
        explanation: 'Đại tướng Võ Nguyên Giáp là Chỉ huy trưởng của Quân đội Nhân dân Việt Nam trong Chiến dịch Điện Biên Phủ.'
      },
      {
        id: 'p2-m2-q3',
        text: 'Chủ trương “Đánh chắc, tiến chắc” được đưa ra theo chỉ đạo của ai?',
        options: [
          { value: 'A', label: 'Trường Chinh' },
          { value: 'B', label: 'Lê Duẩn' },
          { value: 'C', label: 'Hồ Chí Minh' },
          { value: 'D', label: 'Phạm Văn Đồng' }
        ],
        correct: 'C',
        explanation: 'Chủ tịch Hồ Chí Minh chỉ đạo chủ trương “Đánh chắc, tiến chắc” trong Chiến dịch Điện Biên Phủ.'
      },
      {
        id: 'p2-m2-q4',
        text: 'Chiến thắng Điện Biên Phủ đã dẫn đến sự kiện lịch sử nào sau đây?',
        options: [
          { value: 'A', label: 'Ký Hiệp định Giơnevơ, chấm dứt chiến tranh ở Đông Dương' },
          { value: 'B', label: 'Giải phóng hoàn toàn miền Nam Việt Nam' },
          { value: 'C', label: 'Thành lập nước Việt Nam Dân chủ Cộng hòa' },
          { value: 'D', label: 'Bắt đầu cuộc kháng chiến chống Mỹ' }
        ],
        correct: 'A',
        explanation: 'Chiến thắng Điện Biên Phủ dẫn đến việc ký Hiệp định Giơnevơ, chấm dứt chiến tranh ở Đông Dương.'
      },
  ],
  // Quiz cho MOOC ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ III CỦA ĐẢNG (1960)
  'p3-m1': [
    {
      id: 'p3-m1-q1',
      text: 'Đại hội đại biểu toàn quốc lần thứ III của Đảng Lao động Việt Nam được tổ chức vào thời gian nào?',
      options: [
        { value: 'A', label: 'Tháng 1 năm 1959' },
        { value: 'B', label: 'Tháng 9 năm 1960' },
        { value: 'C', label: 'Tháng 3 năm 1961' },
        { value: 'D', label: 'Tháng 5 năm 1962' }
      ],
      correct: 'B',
      explanation: 'Đại hội đại biểu toàn quốc lần thứ III của Đảng Lao động Việt Nam được tổ chức vào tháng 9 năm 1960.'
    },
    {
      id: 'p3-m1-q2',
      text: 'Khẩu hiệu chiến lược được Chủ tịch Hồ Chí Minh nêu trong Đại hội III là gì?',
      options: [
        { value: 'A', label: '“Đoàn kết toàn dân, kháng chiến đến cùng”' },
        { value: 'B', label: '“Tất cả vì miền Nam ruột thịt”' },
        { value: 'C', label: '“Xây dựng chủ nghĩa xã hội ở miền Bắc, đấu tranh hòa bình thống nhất nước nhà”' },
        { value: 'D', label: '“Độc lập – Tự do – Hạnh phúc”' }
      ],
      correct: 'C',
      explanation: 'Khẩu hiệu chiến lược được Chủ tịch Hồ Chí Minh nêu trong Đại hội III là “Xây dựng chủ nghĩa xã hội ở miền Bắc, đấu tranh hòa bình thống nhất nước nhà”.'
    },
    {
      id: 'p3-m1-q3',
      text: 'Tại Đại hội III, ai được bầu làm Bí thư thứ nhất Ban Chấp hành Trung ương Đảng?',
      options: [
        { value: 'A', label: 'Hồ Chí Minh' },
        { value: 'B', label: 'Lê Duẩn' },
        { value: 'C', label: 'Trường Chinh' },
        { value: 'D', label: 'Phạm Văn Đồng' }
      ],
      correct: 'B',
      explanation: 'Đồng chí Lê Duẩn được bầu làm Bí thư thứ nhất Ban Chấp hành Trung ương Đảng tại Đại hội III.'
    },
    {
      id: 'p3-m1-q4',
      text: 'Đại hội III có ý nghĩa lịch sử to lớn nhất là gì?',
      options: [
        { value: 'A', label: 'Mở đầu công cuộc đổi mới đất nước' },
        { value: 'B', label: 'Đưa Việt Nam trở thành thành viên Liên Hợp Quốc' },
        { value: 'C', label: 'Hoàn chỉnh đường lối cách mạng Việt Nam trong giai đoạn mới, xác định hai nhiệm vụ chiến lược ở hai miền' },
        { value: 'D', label: 'Hoàn thành giải phóng miền Nam' }
      ],
      correct: 'C',
      explanation: 'Đại hội III có ý nghĩa lịch sử to lớn nhất là hoàn chỉnh đường lối cách mạng Việt Nam trong giai đoạn mới, xác định hai nhiệm vụ chiến lược ở hai miền.'
    }
  ],
  // Quiz cho MOOC CHIẾN THẮNG 30/4/1975 – GIẢI PHÓNG MIỀN NAM, THỐNG NHẤT ĐẤT NƯỚC
  'p3-m2': [
    {
      id: 'p3-m2-q1',
      text: 'Chiến dịch cuối cùng dẫn đến giải phóng hoàn toàn miền Nam năm 1975 là chiến dịch nào?',
      options: [
        { value: 'A', label: 'Chiến dịch Tây Nguyên' },
        { value: 'B', label: 'Chiến dịch Huế – Đà Nẵng' },
        { value: 'C', label: 'Chiến dịch Hồ Chí Minh' },
        { value: 'D', label: 'Chiến dịch Điện Biên Phủ' }
      ],
      correct: 'C',
      explanation: 'Chiến dịch Hồ Chí Minh là chiến dịch cuối cùng dẫn đến giải phóng hoàn toàn miền Nam năm 1975.'
    },
    {
      id: 'p3-m2-q2',
      text: 'Thời điểm kết thúc Chiến dịch Hồ Chí Minh lịch sử là khi nào?',
      options: [
        { value: 'A', label: '10 giờ ngày 30/4/1975' },
        { value: 'B', label: '11 giờ 30 phút ngày 30/4/1975' },
        { value: 'C', label: '12 giờ ngày 1/5/1975' },
        { value: 'D', label: '17 giờ ngày 29/4/1975' }
      ],
      correct: 'B',
      explanation: 'Chiến dịch Hồ Chí Minh kết thúc vào 11 giờ 30 phút ngày 30/4/1975.'
    },
    {
      id: 'p3-m2-q3',
      text: 'Miền Bắc trong giai đoạn 1954–1975 được xác định là gì trong chiến lược cách mạng của Đảng?',
      options: [
        { value: 'A', label: 'Tiền tuyến lớn' },
        { value: 'B', label: 'Hậu phương lớn' },
        { value: 'C', label: 'Khu vực trung gian' },
        { value: 'D', label: 'Mặt trận chiến lược' }
      ],
      correct: 'B',
      explanation: 'Miền Bắc trong giai đoạn 1954–1975 được xác định là hậu phương lớn trong chiến lược cách mạng của Đảng.'
    },
    {
      id: 'p3-m2-q4',
      text: 'Chiến thắng 30/4/1975 đã mở ra kỷ nguyên mới nào cho dân tộc Việt Nam?',
      options: [
        { value: 'A', label: 'Kỷ nguyên độc lập, tự chủ về kinh tế' },
        { value: 'B', label: 'Kỷ nguyên đổi mới và công nghiệp hóa' },
        { value: 'C', label: 'Kỷ nguyên hòa bình, độc lập, thống nhất và cả nước cùng đi lên chủ nghĩa xã hội' },
        { value: 'D', label: 'Kỷ nguyên hội nhập quốc tế sâu rộng' }
      ],
      correct: 'C',
      explanation: 'Chiến thắng 30/4/1975 đã mở ra kỷ nguyên hòa bình, độc lập, thống nhất và cả nước cùng đi lên chủ nghĩa xã hội cho dân tộc Việt Nam.'
    },
  ],
  // Quiz cho MOOC Đại hội IV (12/1976) – Đảng Cộng sản Việt Nam
  'p4-m1': [
    {
      id: 'p4-m1-q1',
      text: 'Đại hội IV của Đảng được gọi là đại hội gì?',
      options: [
        { value: 'A', label: 'Đại hội kháng chiến thắng lợi' },
        { value: 'B', label: 'Đại hội thống nhất đất nước, tiến lên CNXH' },
        { value: 'C', label: 'Đại hội đổi mới' },
        { value: 'D', label: 'Đại hội dân chủ nhân dân' }
      ],
      correct: 'B',
      explanation: 'Đại hội IV của Đảng được gọi là Đại hội thống nhất đất nước, tiến lên chủ nghĩa xã hội.'
    },
    {
      id: 'p4-m1-q2',
      text: 'Ai được bầu làm Tổng Bí thư tại Đại hội IV của Đảng?',
      options: [
        { value: 'A', label: 'Hồ Chí Minh' },
        { value: 'B', label: 'Trường Chinh' },
        { value: 'C', label: 'Lê Duẩn' },
        { value: 'D', label: 'Nguyễn Văn Linh' }
      ],
      correct: 'C',
      explanation: 'Đồng chí Lê Duẩn được bầu làm Tổng Bí thư tại Đại hội IV của Đảng.'
    },
    {
      id: 'p4-m1-q3',
      text: 'Nhiệm vụ trọng tâm được Đại hội IV đề ra là gì?',
      options: [
        { value: 'A', label: 'Kháng chiến chống Mỹ' },
        { value: 'B', label: 'Thực hiện công nghiệp hóa xã hội chủ nghĩa trên phạm vi cả nước' },
        { value: 'C', label: 'Phát triển kinh tế thị trường' },
        { value: 'D', label: 'Đổi mới toàn diện đất nước' }
      ],
      correct: 'B',
      explanation: 'Nhiệm vụ trọng tâm của Đại hội IV là thực hiện công nghiệp hóa xã hội chủ nghĩa trên phạm vi cả nước.'
    }
  ],
  // Quiz cho MOOC Đại hội VI (6/1991) – Đảng Cộng sản Việt Nam
  'p4-m2': [
    {
      id: 'p4-m2-q1',
      text: 'Bối cảnh diễn ra Đại hội VI là:',
      options: [
        { value: 'A', label: 'Đất nước vừa thống nhất' },
        { value: 'B', label: 'Khủng hoảng kinh tế - xã hội nghiêm trọng' },
        { value: 'C', label: 'Đang trong thời kỳ chiến tranh' },
        { value: 'D', label: 'Đang xây dựng kế hoạch 5 năm đầu tiên' }
      ],
      correct: 'B',
      explanation: 'Đại hội VI diễn ra trong bối cảnh đất nước khủng hoảng kinh tế - xã hội nghiêm trọng.'
    },
    {
      id: 'p4-m2-q2',
      text: 'Ai được bầu làm Tổng Bí thư tại Đại hội VI của Đảng?',
      options: [
        { value: 'A', label: 'Lê Duẩn' },
        { value: 'B', label: 'Trường Chinh' },
        { value: 'C', label: 'Nguyễn Văn Linh' },
        { value: 'D', label: 'Đỗ Mười' }
      ],
      correct: 'C',
      explanation: 'Đồng chí Nguyễn Văn Linh được bầu làm Tổng Bí thư tại Đại hội VI của Đảng.'
    },
    {
      id: 'p4-m2-q3',
      text: 'Đường lối cơ bản của Đại hội VI là:',
      options: [
        { value: 'A', label: 'Cải cách ruộng đất' },
        { value: 'B', label: 'Đổi mới toàn diện, trước hết là đổi mới kinh tế' },
        { value: 'C', label: 'Tiếp tục cơ chế tập trung quan liêu bao cấp' },
        { value: 'D', label: 'Mở rộng quan hệ quốc tế với phương Tây' }
      ],
      correct: 'B',
      explanation: 'Đường lối cơ bản của Đại hội VI là đổi mới toàn diện, trước hết là đổi mới kinh tế.'
    },
  ],
  // Quiz cho MOOC Đại hội VII – Đảng Cộng sản Việt Nam
  'p4-m3': [
    {
      id: 'p4-m3-q1',
      text: 'Đại hội VII của Đảng được tổ chức vào năm nào?',
      options: [
        { value: 'A', label: '1986' },
        { value: 'B', label: '1991' },
        { value: 'C', label: '1995' },
        { value: 'D', label: '2001' }
      ],
      correct: 'B',
      explanation: 'Đại hội VII của Đảng được tổ chức vào năm 1991.'
    },
    {
      id: 'p4-m3-q2',
      text: 'Đại hội VII thông qua văn kiện quan trọng nào lần đầu tiên của Đảng?',
      options: [
        { value: 'A', label: 'Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH' },
        { value: 'B', label: 'Hiến pháp 1992' },
        { value: 'C', label: 'Đường lối đổi mới toàn diện' },
        { value: 'D', label: 'Kế hoạch 5 năm lần thứ 6' }
      ],
      correct: 'A',
      explanation: 'Đại hội VII thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội lần đầu tiên.'
    },
    {
      id: 'p4-m3-q3',
      text: 'Khẩu hiệu hành động của Đại hội VII là:',
      options: [
        { value: 'A', label: 'Đổi mới, dân chủ, kỷ cương, đoàn kết' },
        { value: 'B', label: 'Ổn định và phát triển' },
        { value: 'C', label: 'Đoàn kết, đổi mới, vì dân giàu, nước mạnh' },
        { value: 'D', label: 'Tất cả vì Tổ quốc XHCN' }
      ],
      correct: 'C',
      explanation: 'Khẩu hiệu hành động của Đại hội VII là "Đoàn kết, đổi mới, vì dân giàu, nước mạnh".'
    },
    {
      id: 'p4-m3-q4',
      text: 'Đại hội VII có ý nghĩa lịch sử quan trọng vì:',
      options: [
        { value: 'A', label: 'Đưa đất nước thoát khỏi khủng hoảng kinh tế' },
        { value: 'B', label: 'Khẳng định con đường đi lên chủ nghĩa xã hội ở Việt Nam' },
        { value: 'C', label: 'Hoàn thành công cuộc thống nhất' },
        { value: 'D', label: 'Mở đầu thời kỳ đổi mới' }
      ],
      correct: 'B',
      explanation: 'Đại hội VII có ý nghĩa lịch sử quan trọng vì khẳng định con đường đi lên chủ nghĩa xã hội ở Việt Nam.'
    },
  ],
  // Quiz cho MOOC Đại hội XI – Đảng Cộng sản Việt Nam
  'p5-m1': [
    {
      id: 'p5-m1-q1',
      text: 'Đại hội đại biểu toàn quốc lần thứ XI của Đảng Cộng sản Việt Nam diễn ra vào thời gian nào?',
      options: [
        { value: 'A', label: '10–18/1/2010' },
        { value: 'B', label: '12–19/1/2011' },
        { value: 'C', label: '15–22/1/2012' },
        { value: 'D', label: '20–28/1/2013' }
      ],
      correct: 'B',
      explanation: 'Đại hội XI của Đảng Cộng sản Việt Nam diễn ra từ ngày 12–19/1/2011.'
    },
    {
      id: 'p5-m1-q2',
      text: 'Tại Đại hội XI, ai được bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng khóa XI?',
      options: [
        { value: 'A', label: 'Nông Đức Mạnh' },
        { value: 'B', label: 'Nguyễn Tấn Dũng' },
        { value: 'C', label: 'Nguyễn Minh Triết' },
        { value: 'D', label: 'Nguyễn Phú Trọng' }
      ],
      correct: 'D',
      explanation: 'Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng khóa XI tại Đại hội XI.'
    },
    {
      id: 'p5-m1-q3',
      text: 'Một trong những văn kiện quan trọng được Đại hội XI thông qua là gì?',
      options: [
        { value: 'A', label: 'Chiến lược phát triển kinh tế - xã hội 2011–2020' },
        { value: 'B', label: 'Cương lĩnh 1930' },
        { value: 'C', label: 'Nghị quyết Trung ương 4 (khóa XI)' },
        { value: 'D', label: 'Luật Đảng viên mới' }
      ],
      correct: 'A',
      explanation: 'Một trong những văn kiện quan trọng được Đại hội XI thông qua là Chiến lược phát triển kinh tế - xã hội 2011–2020.'
    },
    {
      id: 'p5-m1-q4',
      text: 'Mục tiêu tổng quát Đại hội XI đề ra đến năm 2020 là gì?',
      options: [
        { value: 'A', label: 'Việt Nam trở thành nước công nghiệp theo hướng hiện đại' },
        { value: 'B', label: 'Việt Nam trở thành nước phát triển, thu nhập cao' },
        { value: 'C', label: 'Hoàn thành công nghiệp hóa, hiện đại hóa toàn diện' },
        { value: 'D', label: 'Xây dựng nền kinh tế tri thức hàng đầu châu Á' }
      ],
      correct: 'A',
      explanation: 'Mục tiêu tổng quát Đại hội XI đề ra đến năm 2020 là Việt Nam trở thành nước công nghiệp theo hướng hiện đại.'
    },
  ],
  // Quiz cho MOOC Đại hội XIII – Đảng Cộng sản Việt Nam
  'p5-m2': [
      {
        id: 'p5-m2-q1',
        text: 'Đại hội đại biểu toàn quốc lần thứ XIII của Đảng diễn ra ở đâu và vào thời gian nào?',
        options: [
          { value: 'A', label: 'TP. Hồ Chí Minh, 10–17/01/2021' },
          { value: 'B', label: 'Hà Nội, 26/01–1/02/2021' },
          { value: 'C', label: 'Đà Nẵng, 1–8/02/2021' },
          { value: 'D', label: 'Hải Phòng, 5–11/02/2021' }
        ],
        correct: 'B',
        explanation: 'Đại hội XIII của Đảng diễn ra tại Hà Nội từ ngày 26/01 đến 1/02/2021.'
      },
      {
        id: 'p5-m2-q2',
        text: 'Chủ đề của Đại hội XIII nhấn mạnh nội dung nào dưới đây?',
        options: [
          { value: 'A', label: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước' },
          { value: 'B', label: 'Xây dựng Đảng trong sạch, vững mạnh; khơi dậy khát vọng phát triển phồn vinh, hạnh phúc' },
          { value: 'C', label: 'Tăng cường quốc phòng, an ninh và hội nhập quốc tế' },
          { value: 'D', label: 'Phát triển kinh tế tri thức và bảo vệ môi trường' }
        ],
        correct: 'B',
        explanation: 'Chủ đề Đại hội XIII nhấn mạnh xây dựng Đảng trong sạch, vững mạnh; khơi dậy khát vọng phát triển phồn vinh, hạnh phúc.'
      },
      {
        id: 'p5-m2-q3',
        text: 'Đại hội XIII đề ra tầm nhìn phát triển đất nước đến năm 2045 với mục tiêu gì?',
        options: [
          { value: 'A', label: 'Việt Nam trở thành nước công nghiệp hóa, hiện đại' },
          { value: 'B', label: 'Việt Nam trở thành nước phát triển, có thu nhập cao' },
          { value: 'C', label: 'Việt Nam trở thành trung tâm kinh tế Đông Nam Á' },
          { value: 'D', label: 'Việt Nam gia nhập G20' }
        ],
        correct: 'B',
        explanation: 'Đại hội XIII đề ra mục tiêu đến năm 2045, Việt Nam trở thành nước phát triển, có thu nhập cao.'
      },
      {
        id: 'p5-m2-q4',
        text: 'Ai tiếp tục được tín nhiệm bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng khóa XIII?',
        options: [
          { value: 'A', label: 'Nguyễn Xuân Phúc' },
          { value: 'B', label: 'Phạm Minh Chính' },
          { value: 'C', label: 'Nguyễn Phú Trọng' },
          { value: 'D', label: 'Vương Đình Huệ' }
        ],
        correct: 'C',
        explanation: 'Đồng chí Nguyễn Phú Trọng tiếp tục được tín nhiệm bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng khóa XIII.'
      },
  ],
};

console.log('QUIZ_DATA loaded:', Object.keys(QUIZ_DATA));

export default QUIZ_DATA;