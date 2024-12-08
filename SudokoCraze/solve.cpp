#include <iostream>
#include <vector>
using namespace std;

bool isSafe(int row, int col, char val, vector<vector<char>> &board)
{
    for (int i = 0; i < 9; i++)
    {
        if (board[i][col] == val)
            return false;
        if (board[row][i] == val)
            return false;
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == val)
            return false;
    }
    return true;
}
bool solve(vector<vector<char>> &board)
{
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (board[i][j] == '.')
            {
                for (char k = '1'; k <= '9'; k++)
                {
                    if (isSafe(i, j, k, board))
                    {
                        board[i][j] = k;
                        bool check = solve(board);
                        if (check)
                        {
                            return true;
                        }
                        else
                        {
                            board[i][j] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
void solveSudoku(vector<vector<char>> &board)
{
    solve(board);
}
