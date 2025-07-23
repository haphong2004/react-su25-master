<<<<<<< HEAD
# Lập trình Front-End Framework 2 - WEB2091

# Hướng dẫn cài đặt dự án Vite + React + TypeScript

## Giới thiệu

Đây là hướng dẫn để tạo và chạy một ứng dụng React cơ bản sử dụng Vite làm công cụ build và TypeScript để đảm bảo type safety. Dự án được quản lý gói bằng `pnpm`, một công cụ nhanh và hiệu quả.

### Các thành phần chính trong dự án

- **`src/`**: Thư mục chứa mã nguồn của ứng dụng.
  - `App.tsx`: Thành phần chính của ứng dụng React, nơi bạn định nghĩa giao diện người dùng.
  - `main.tsx`: Điểm vào chính, nơi ứng dụng được render vào DOM.
  - `index.css`: File CSS toàn cục cho kiểu dáng ứng dụng.
  - `vite-env.d.ts`: File định nghĩa các biến môi trường của Vite.
- **`public/`**: Thư mục chứa các tài nguyên tĩnh như favicon, hình ảnh, v.v.
- **`vite.config.ts`**: File cấu hình Vite, cho phép tùy chỉnh các plugin và cài đặt build.
- **`tsconfig.json`**: File cấu hình TypeScript, định nghĩa các quy tắc biên dịch.
- **`package.json`**: File chứa thông tin dự án và các dependencies.
- **`pnpm-lock.yaml`**: File khóa phiên bản các gói, đảm bảo cài đặt nhất quán.

## Yêu cầu

- Node.js (phiên bản 16 hoặc cao hơn)
- `pnpm` (phiên bản mới nhất)

## Hướng dẫn cài đặt

### 1. Cài đặt `pnpm`

Nếu chưa cài `pnpm`, bạn có thể cài đặt thông qua lệnh:

```bash
npm install -g pnpm
```

### 2. Tạo dự án mới

Chạy lệnh sau để tạo một dự án Vite với template React và TypeScript:

```bash
pnpm create vite my-react-app --template react-ts
```

- `my-react-app`: Tên thư mục dự án của bạn.
- `--template react-ts`: Sử dụng template React với TypeScript.

### 3. Di chuyển vào thư mục dự án

```bash
cd my-react-app
```

### 4. Cài đặt dependencies

Cài đặt các gói cần thiết bằng `pnpm`:

```bash
pnpm install
```

### 5. Chạy dự án

Khởi động server phát triển:

```bash
pnpm dev
```

Mở trình duyệt và truy cập `http://localhost:5173` để xem ứng dụng.

### 6. Build dự án

Để build ứng dụng cho production:

```bash
pnpm build
```

Kết quả sẽ nằm trong thư mục `dist`.

### 7. Xem trước build production

Để kiểm tra build production:

```bash
pnpm preview
```

## Cấu trúc dự án

Dưới đây là cấu trúc cơ bản của dự án:

```
my-react-app/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Lệnh hữu ích

- `pnpm dev`: Chạy server phát triển.
- `pnpm build`: Build ứng dụng cho production.
- `pnpm preview`: Xem trước build production.
- `pnpm add <package>`: Cài đặt thêm gói (ví dụ: `pnpm add axios`).
- `pnpm remove <package>`: Gỡ gói.

## Tùy chỉnh

- **Thêm thư viện**: Sử dụng `pnpm add <package>` để thêm các thư viện như `react-router-dom`, `axios`, hoặc `tailwindcss`.
- **Cấu hình Vite**: Chỉnh sửa `vite.config.ts` để thêm các plugin hoặc tùy chỉnh build.
- **TypeScript**: Tùy chỉnh `tsconfig.json` để thay đổi các quy tắc biên dịch TypeScript.

## Tài nguyên bổ sung

- [Tài liệu Vite](https://vitejs.dev/)
- [Tài liệu React](https://react.dev/)
- [Tài liệu TypeScript](https://www.typescriptlang.org/)
- [Tài liệu pnpm](https://pnpm.io/)

Chúc bạn thành công với dự án React của mình!
=======
# react-su25-master
>>>>>>> 8be73e025ab300384b2e04c084e9b892e4851957
