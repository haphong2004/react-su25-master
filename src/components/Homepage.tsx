import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import Header from "./Header";

// Define types for our data
interface Statistic {
  id: number;
  name: string;
  value: number;
  change: number;
  icon: string;
}

// Mock data - replace with your actual data source
const mockData: Statistic[] = [
  { id: 1, name: 'Tổng người dùng', value: 2543, change: 12, icon: '👥' },
  { id: 2, name: 'Tổng đơn hàng', value: 1250, change: 5, icon: '📦' },
  { id: 3, name: 'Doanh thu', value: 125000000, change: 8, icon: '💰' },
  { id: 4, name: 'Tỷ lệ hoàn thành', value: 92, change: 2, icon: '✅' },
];

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistic[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatistics(mockData);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Header />
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Tổng quan
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statistics.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {stat.name.includes('Doanh thu') ? `${formatNumber(stat.value)} VNĐ` :
                        stat.name.includes('Tỷ lệ') ? `${stat.value}%` : formatNumber(stat.value)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={stat.change >= 0 ? 'success.main' : 'error.main'}
                      sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                    >
                      {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}% so với tháng trước
                    </Typography>
                  </Box>
                  <Typography variant="h4">{stat.icon}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Data Table */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Thống kê chi tiết
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Chỉ số</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Giá trị</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Thay đổi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.map((row, index) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      {row.name.includes('Doanh thu') ? `${formatNumber(row.value)} VNĐ` :
                        row.name.includes('Tỷ lệ') ? `${row.value}%` : formatNumber(row.value)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: row.change >= 0 ? 'success.main' : 'error.main' }}
                    >
                      {row.change >= 0 ? '+' : ''}{row.change}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default Homepage;
