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
  ]
};

console.log('QUIZ_DATA loaded:', Object.keys(QUIZ_DATA));

export default QUIZ_DATA;