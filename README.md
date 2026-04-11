# Nectar App - Đồ án lập trình trên thiết bị di động

## Thông tin sinh viên
- **Họ và tên:** [Tên của bạn]
- **MSSV:** [Mã số sinh viên của bạn]
- **Lớp:** [Tên lớp]

## Mô tả ứng dụng
Nectar App là ứng dụng mua sắm trực tuyến (groceries) với các chức năng:
- Đăng ký / Đăng nhập tài khoản
- Xem danh sách sản phẩm
- Tìm kiếm sản phẩm
- Lọc sản phẩm theo danh mục và thương hiệu
- Thêm sản phẩm vào giỏ hàng
- Quản lý giỏ hàng (tăng/giảm số lượng, xóa sản phẩm)
- Đặt hàng và lưu lịch sử đơn hàng
- Xem lịch sử đơn hàng

## Chức năng chính

### 1. Xác thực & Lưu đăng nhập
- Đăng ký tài khoản mới
- Đăng nhập với tài khoản đã đăng ký
- Tự động đăng nhập khi mở lại ứng dụng
- Đăng xuất xóa toàn bộ dữ liệu

### 2. Giỏ hàng
- Thêm sản phẩm vào giỏ
- Lưu giỏ hàng vào AsyncStorage
- Tăng/giảm số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ

### 3. Đơn hàng
- Xác nhận đơn hàng trước khi đặt
- Lưu đơn hàng vào AsyncStorage
- Hiển thị danh sách đơn hàng với thời gian đặt

## Công nghệ sử dụng
- React Native
- Expo
- React Navigation
- AsyncStorage

## Hướng dẫn cài đặt và chạy app

### Yêu cầu
- Node.js (>= 14.x)
- npm hoặc yarn
- Expo CLI
- Điện thoại có cài Expo Go hoặc máy ảo Android/iOS

### Các bước chạy

```bash
# 1. Clone dự án
git clone https://github.com/[username]/nectar-app-2.git

# 2. Di chuyển vào thư mục dự án
cd nectar-app-2

# 3. Cài đặt dependencies
npm install

# 4. Chạy ứng dụng
npx expo start -c