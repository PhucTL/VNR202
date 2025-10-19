const TIMELINE = [
  {
    id: 'phase-1',
    title: '1930–1945: Khởi đầu cách mạng',
    yearRange: '1930–1945',
    description: 'Những bước đi đầu tiên hình thành Đảng và phong trào cách mạng.',
    roomTheme: 'foundation',
    milestones: [
      { 
        id: 'p1-m1', 
        title: 'Thành lập Đảng Cộng sản Việt Nam', 
        category: 'event',
        type: 'image', 
        src: '/assets/p1-1.jpg', 
        caption: 'Hội nghị thành lập Đảng tại Hồng Kông ngày 3/2/1930',
        details: {
          date: '3/2/1930',
          location: 'Hồng Kông',
          significance: 'Đánh dấu sự ra đời của tổ chức lãnh đạo cách mạng Việt Nam',
          keyFigures: ['Nguyễn Ái Quốc'],
          historicalContext: 'Trong bối cảnh phong trào cách mạng thế giới và nhu cầu giải phóng dân tộc'
        },
        gallery: [
          { src: '/assets/p1-1.jpg', caption: 'Hội nghị thành lập Đảng tại Hồng Kông ngày 3/2/1930' },
          { src: '/assets/p1-1.jpg', caption: 'Nguyễn Ái Quốc chủ trì việc thành lập Đảng' },
          { src: '/assets/p1-1.jpg', caption: 'Cương lĩnh chính trị đầu tiên của Đảng' }
        ],
        audioText: `Ngày 3 tháng 2 năm 1930, tại Hồng Kông, dưới sự chủ trì của Nguyễn Ái Quốc, 
        Đảng Cộng sản Việt Nam chính thức ra đời. Đây là sự kiện có ý nghĩa lịch sử vô cùng quan trọng, 
        đánh dấu bước ngoặt mới trong cuộc đấu tranh giải phóng dân tộc của nhân dân Việt Nam.
        Đảng đã đưa ra Cương lĩnh chính trị đầu tiên, xác định rõ mục tiêu cách mạng dân tộc dân chủ nhân dân.`
      },
      { 
        id: 'p1-m2', 
        title: 'Nguyễn Ái Quốc - Người sáng lập', 
        category: 'character',
        type: 'image', 
        src: '/assets/p1-1.jpg', 
        caption: 'Chân dung Nguyễn Ái Quốc thời kỳ hoạt động quốc tế',
        details: {
          fullName: 'Nguyễn Sinh Cung (Nguyễn Ái Quốc)',
          role: 'Người sáng lập và lãnh tụ của Đảng',
          contribution: 'Thành lập Đảng, xây dựng đường lối cách mạng Việt Nam',
          quote: 'Đường cách mạng là con đường duy nhất để giải phóng dân tộc'
        }
      },
      { 
        id: 'p1-m3', 
        title: 'Tư tưởng Hồ Chí Minh về độc lập dân tộc', 
        category: 'ideology',
        type: 'image', 
        src: '/assets/p1-1.jpg', 
        caption: 'Những tư tưởng cốt lõi về giải phóng dân tộc và chủ nghĩa xã hội',
        details: {
          coreIdea: 'Kết hợp độc lập dân tộc với chủ nghĩa xã hội',
          impact: 'Định hướng toàn bộ đường lối cách mạng Việt Nam',
          quote: 'Không có gì quý hơn độc lập tự do'
        }
      }
    ]
  },
  {
    id: 'phase-2',
    title: '1945–1954: Kháng chiến chống Pháp',
    yearRange: '1945–1954',
    description: 'Công cuộc kháng chiến giành độc lập dân tộc.',
    roomTheme: 'resistance',
    milestones: [
      { 
        id: 'p2-m1', 
        title: 'Cách mạng Tháng Tám 1945', 
        category: 'event',
        type: 'image', 
        src: '/assets/p2-1.jpg', 
        caption: 'Nhân dân Việt Nam đứng lên giành chính quyền',
        details: {
          date: 'Tháng 8/1945',
          significance: 'Giành được chính quyền, thành lập nước Việt Nam Dân chủ Cộng hòa',
          outcome: 'Kết thúc ách thống trị thực dân phong kiến'
        },
        gallery: [
          { src: '/assets/p2-1.jpg', caption: 'Nhân dân Việt Nam đứng lên giành chính quyền trong Cách mạng Tháng Tám' },
          { src: '/assets/p2-1.jpg', caption: 'Lực lượng cách mạng tiến vào Hà Nội ngày 19/8/1945' },
          { src: '/assets/p2-1.jpg', caption: 'Chính quyền cách mạng được thành lập trên cả nước' }
        ],
        audioText: `Cách mạng Tháng Tám năm 1945 là cuộc cách mạng vĩ đại của nhân dân Việt Nam.
        Dưới sự lãnh đạo của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh, nhân dân ta đã đứng lên
        giành chính quyền từ tay thực dân Pháp và phong kiến. Ngày 19 tháng 8, Hà Nội được giải phóng.
        Cách mạng thành công đã kết thúc hàng ngàn năm ách thống trị phong kiến và gần một thế kỷ ách nô lệ thực dân.`
      },
      { 
        id: 'p2-m2', 
        title: 'Chủ tịch Hồ Chí Minh', 
        category: 'character',
        type: 'image', 
        src: '/assets/p2-1.jpg', 
        caption: 'Chủ tịch Hồ Chí Minh - Lãnh tụ kính yêu của dân tộc',
        details: {
          role: 'Chủ tịch nước Việt Nam Dân chủ Cộng hòa',
          contribution: 'Lãnh đạo cách mạng Tháng Tám và kháng chiến chống Pháp',
          quote: 'Thà hy sinh tất cả, chứ không chịu mất nước, không chịu làm nô lệ'
        }
      },
      { 
        id: 'p2-m3', 
        title: 'Tuyên ngôn Độc lập 2/9/1945', 
        category: 'ideology',
        type: 'image', 
        src: '/assets/p2-1.jpg', 
        caption: 'Bản tuyên ngôn lịch sử khai sinh nước Việt Nam Dân chủ Cộng hòa',
        details: {
          date: '2/9/1945',
          location: 'Quảng trường Ba Đình, Hà Nội',
          significance: 'Tuyên bố độc lập của dân tộc Việt Nam',
          quote: 'Tất cả mọi người đều sinh ra có quyền bình đẳng'
        }
      }
    ]
  },
  {
    id: 'phase-3',
    title: '1954–1975: Kháng chiến chống Mỹ',
    yearRange: '1954–1975',
    description: 'Giai đoạn đấu tranh thống nhất đất nước.',
    roomTheme: 'unification',
    milestones: [
      { 
        id: 'p3-m1', 
        title: 'Chiến thắng Điện Biên Phủ', 
        category: 'event',
        type: 'image', 
        src: '/assets/p3-1.jpg', 
        caption: 'Chiến thắng "lừng lẫy năm châu, chấn động địa cầu"',
        details: {
          date: '7/5/1954',
          significance: 'Kết thúc ách thống trị thực dân Pháp tại Đông Dương',
          commander: 'Đại tướng Võ Nguyên Giáp',
          outcome: 'Mở đường cho đàm phán Hiệp định Genève'
        },
        gallery: [
          { src: '/assets/p3-1.jpg', caption: 'Chiến thắng Điện Biên Phủ - "lừng lẫy năm châu, chấn động địa cầu"' },
          { src: '/assets/p3-1.jpg', caption: 'Quân và dân ta chuẩn bị cho trận quyết chiến' },
          { src: '/assets/p3-1.jpg', caption: 'Lá cờ Tổ quốc tung bay trên đồi A1 Điện Biên Phủ' }
        ],
        audioText: `Chiến thắng Điện Biên Phủ ngày 7 tháng 5 năm 1954 là một chiến thắng có ý nghĩa lịch sử to lớn.
        Dưới sự chỉ huy tài tình của Đại tướng Võ Nguyên Giáp, quân và dân ta đã đánh bại hoàn toàn
        tập đoàn cứ điểm Điện Biên Phủ của thực dân Pháp. Chiến thắng này đã "lừng lẫy năm châu, chấn động địa cầu",
        kết thúc ách thống trị của thực dân Pháp tại Đông Dương và mở ra kỷ nguyên mới cho dân tộc Việt Nam.`
      },
      { 
        id: 'p3-m2', 
        title: 'Đại tướng Võ Nguyên Giáp', 
        category: 'character',
        type: 'image', 
        src: '/assets/p3-1.jpg', 
        caption: 'Đại tướng Võ Nguyên Giáp - Người anh hùng Điện Biên Phủ',
        details: {
          role: 'Tổng tư lệnh Quân đội nhân dân Việt Nam',
          contribution: 'Chỉ huy chiến thắng Điện Biên Phủ và nhiều chiến dịch lớn',
          quote: 'Không có gì không thể, chỉ có những điều chưa làm được'
        }
      },
      { 
        id: 'p3-m3', 
        title: 'Đường lối kháng chiến toàn dân', 
        category: 'ideology',
        type: 'image', 
        src: '/assets/p3-1.jpg', 
        caption: 'Tư tưởng kháng chiến toàn dân, toàn diện',
        details: {
          coreIdea: 'Kháng chiến toàn dân, toàn diện, lâu dài',
          impact: 'Động viên toàn dân tộc tham gia kháng chiến',
          quote: 'Toàn dân đoàn kết, toàn dân kháng chiến'
        }
      }
    ]
  },
  {
    id: 'phase-4',
    title: '1975–2000: Đổi mới và phát triển',
    yearRange: '1975–2000',
    description: 'Thời kỳ thống nhất, đổi mới và phát triển đất nước.',
    roomTheme: 'reform',
    milestones: [
      { 
        id: 'p4-m1',
        title: 'Đại hội IV (12/1976) – Đảng Cộng sản Việt Nam',
        category: 'event',
        type: 'image',
        src: '/assets/daihoiIV_1.jpg',
        caption: 'Đại hội IV – Dấu mốc quan trọng sau thống nhất đất nước (Hà Nội, 12/1976).',
        details: {
          date: '12/1976',
          location: 'Hà Nội',
          historicalContext: 'Sau khi đất nước thống nhất (1975), nhu cầu cấp thiết là đưa cả nước đi lên con đường xã hội chủ nghĩa, củng cố hòa bình và khắc phục hậu quả chiến tranh.',
          significance: 'Là Đại hội đầu tiên của cả nước thống nhất, quyết định đổi tên Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam, thể hiện tinh thần đoàn kết dân tộc.',
          outcome: 'Đề ra đường lối phát triển toàn diện, đưa cả nước đi lên chủ nghĩa xã hội; củng cố khối đại đoàn kết toàn dân và hệ thống chính trị.',
          keyFigures: [
            'Tổng Bí thư Lê Duẩn',
            'Chủ tịch nước Tôn Đức Thắng',
            'Thủ tướng Phạm Văn Đồng'
          ],
          coreIdea: 'Cả nước đi lên chủ nghĩa xã hội, phát huy sức mạnh đại đoàn kết toàn dân tộc.',
          impact: 'Đặt nền móng cho quá trình xây dựng và phát triển đất nước sau chiến tranh; tạo tiền đề cho công cuộc đổi mới sau này.',
          quote: '“Cả nước ta tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội.”'
        },
        gallery: [
          { src: '/assets/daihoiIV_1.jpg', caption: 'Đại hội IV – Dấu mốc quan trọng sau thống nhất đất nước (Hà Nội, 12/1976).' },
          { src: '/assets/daihoiIV_2.jpg', caption: 'Quang cảnh Đại hội đại biểu toàn quốc lần thứ IV với sự tham gia của các đại biểu từ cả nước.' },
          { src: '/assets/tongbithuleduan.jpg', caption: 'Tổng Bí thư Lê Duẩn phát biểu khai mạc Đại hội, đề ra đường lối phát triển đất nước.' }
        ],
        audioText: `Đại hội IV của Đảng Cộng sản Việt Nam diễn ra tại Hà Nội vào tháng 12 năm 1976. 
        Đây là Đại hội đầu tiên của cả nước thống nhất sau chiến thắng 30 tháng 4 năm 1975.
        Đại hội đã quyết định đổi tên từ Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam.
        Tổng Bí thư Lê Duẩn khẳng định: "Cả nước ta tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội."
        Đại hội đã đặt nền móng cho quá trình xây dựng và phát triển đất nước trong thời kỳ mới.`
      },
      { 
        id: 'p4-m2', 
        title: 'Đồng chí Lê Duẩn', 
        category: 'character',
        type: 'image', 
        src: '/assets/daihoiIV_2.jpg', 
        caption: 'Tổng Bí thư Lê Duẩn - Người lãnh đạo thời kỳ thống nhất',
        details: {
          role: 'Tổng Bí thư Ban Chấp hành Trung ương Đảng',
          contribution: 'Lãnh đạo sự nghiệp thống nhất và xây dựng đất nước',
          period: '1960–1986'
        }
      },
      { 
        id: 'p4-m3', 
        title: 'Chính sách Đổi mới 1986', 
        category: 'ideology',
        type: 'image', 
        src: '/assets/daihoiIV_3.jpg', 
        caption: 'Đường lối Đổi mới toàn diện đất nước',
        details: {
          date: 'Đại hội VI - 1986',
          coreIdea: 'Chuyển đổi từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa.',
          impact: 'Mở ra thời kỳ phát triển mới của đất nước.'
        }
      }
    ]
  },
  {
    id: 'phase-5',
    title: '2000–nay: Hội nhập và phát triển',
    yearRange: '2000–nay',
    description: 'Hội nhập quốc tế, phát triển toàn diện trong thời đại mới.',
    roomTheme: 'integration',
    milestones: [
      { 
        id: 'p5-m1', 
        title: 'Gia nhập WTO và hội nhập quốc tế', 
        category: 'event',
        type: 'image', 
        src: '/assets/p5-1.jpg', 
        caption: 'Việt Nam trên con đường hội nhập và phát triển',
        details: {
          date: '2007',
          significance: 'Đánh dấu bước tiến lớn trong hội nhập kinh tế quốc tế',
          outcome: 'Mở rộng quan hệ đối ngoại và phát triển kinh tế'
        }
      },
      { 
        id: 'p5-m2', 
        title: 'Tổng Bí thư Nguyễn Phú Trọng', 
        category: 'character',
        type: 'image', 
        src: '/assets/p5-1.jpg', 
        caption: 'Tổng Bí thư Nguyễn Phú Trọng - Nhà lãnh đạo thời kỳ đổi mới',
        details: {
          role: 'Tổng Bí thư Ban Chấp hành Trung ương Đảng',
          contribution: 'Lãnh đạo đất nước trong thời kỳ hội nhập và phát triển',
          quote: 'Dân là gốc, Đảng phải gần dân, hiểu dân, học dân'
        }
      },
      { 
        id: 'p5-m3', 
        title: 'Tư tưởng Hồ Chí Minh trong thời đại mới', 
        category: 'ideology',
        type: 'image', 
        src: '/assets/p5-1.jpg', 
        caption: 'Vận dụng tư tưởng Hồ Chí Minh trong xây dựng đất nước',
        details: {
          coreIdea: 'Kế thừa và phát triển tư tưởng Hồ Chí Minh trong điều kiện mới',
          impact: 'Định hướng xây dựng đất nước phồn vinh, hạnh phúc',
          quote: 'Độc lập - Tự do - Hạnh phúc'
        }
      }
    ]
  }
];

export default TIMELINE;
