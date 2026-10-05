// Auto-generated data fixture for all Data Science Lab Experiments
export const experimentsData = [
  {
    "id": "1a",
    "moduleId": 1,
    "expNumber": 1,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "1_0",
    "title": "NumPy Array Creation, Reshaping & Indexing",
    "aim": "To demonstrate the creation of 1D, 2D, and multi-dimensional NumPy arrays, examine their attributes, reshape array dimensions, and perform integer and boolean slicing.",
    "coreConcepts": [
      "NumPy ndarray memory layout and homogeneous data types",
      "Attributes: ndim, shape, size, dtype",
      "Reshaping with reshape() and flattening with ravel()",
      "Vectorized boolean masking and fancy indexing"
    ],
    "syntax": "import numpy as np\nnp.array(object, dtype=None)\nnp.arange(start, stop, step)\nndarray.reshape(new_shape)",
    "html": "<h3>Aim</h3><p>To demonstrate the creation of 1D, 2D, and multi-dimensional NumPy arrays, examine their attributes, reshape array dimensions, and perform integer and boolean slicing.</p><h3>Syntax</h3><p><code>import numpy as np<br>arr = np.array([1, 2, 3])<br>reshaped = arr.reshape(rows, cols)</code></p><h3>Procedure</h3><ol><li>Import the NumPy library as <code>np</code>.</li><li>Create 1D and 2D arrays using <code>np.array()</code> and <code>np.arange()</code>.</li><li>Inspect array properties: shape, dimension, item size, and data type.</li><li>Perform array reshaping and conditional boolean filtering.</li></ol>",
    "initialCode": "import numpy as np\n\n# 1. Create a 1D array\narr_1d = np.array([10, 25, 40, 55, 70, 85, 100])\nprint(\"1D Array:\", arr_1d)\nprint(\"Shape:\", arr_1d.shape, \"| Dimensions:\", arr_1d.ndim, \"| Data Type:\", arr_1d.dtype)\n\n# 2. Reshape into a 2D matrix\nmatrix = np.arange(1, 13).reshape(3, 4)\nprint(\"\\n2D Matrix (3x4):\\n\", matrix)\n\n# 3. Slicing rows and columns\nprint(\"\\nSub-matrix (rows 0-1, cols 1-3):\\n\", matrix[0:2, 1:3])\n\n# 4. Boolean Masking (Filter values > 6)\nmask = matrix > 6\nprint(\"\\nValues greater than 6:\\n\", matrix[mask])\n",
    "expectedOutput": "1D Array: [ 10  25  40  55  70  85 100]\nShape: (7,) | Dimensions: 1 | Data Type: int64\n\n2D Matrix (3x4):\n [[ 1  2  3  4]\n [ 5  6  7  8]\n [ 9 10 11 12]]\n\nSub-matrix (rows 0-1, cols 1-3):\n [[2 3]\n [6 7]]\n\nValues greater than 6:\n [ 7  8  9 10 11 12]",
    "tags": [
      "NumPy",
      "Arrays",
      "Vectorization",
      "Indexing"
    ]
  },
  {
    "id": "1b",
    "moduleId": 1,
    "expNumber": 1,
    "partIndex": 1,
    "partLetter": "b",
    "codeKey": "1_1",
    "title": "Vectorized Operations, Universal Functions & Broadcasting",
    "aim": "To implement mathematical computations using NumPy universal functions (ufuncs), matrix operations, and demonstrate numpy broadcasting across mismatched dimensions.",
    "coreConcepts": [
      "Broadcasting rules across leading and trailing axes",
      "Element-wise operations vs linear algebra dot products",
      "Statistical aggregations: mean, std, sum along axes"
    ],
    "syntax": "np.dot(a, b)\nnp.mean(a, axis=0)\nnp.sum(a, axis=1)",
    "html": "<h3>Aim</h3><p>To implement mathematical computations using NumPy universal functions (ufuncs), matrix operations, and demonstrate numpy broadcasting across mismatched dimensions.</p><h3>Procedure</h3><ol><li>Initialize two matrices with compatible broadcasting shapes.</li><li>Perform element-wise multiplication and matrix dot products.</li><li>Compute statistical aggregations along horizontal and vertical axes.</li></ol>",
    "initialCode": "import numpy as np\n\n# 1. Matrix operations\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\nprint(\"Matrix A:\\n\", A)\nprint(\"Matrix B:\\n\", B)\nprint(\"\\nElement-wise product (A * B):\\n\", A * B)\nprint(\"\\nMatrix Dot Product (np.dot(A, B)):\\n\", np.dot(A, B))\n\n# 2. Broadcasting a 1D vector across a 2D matrix\nrow_vector = np.array([10, 20])\nbroadcasted = A + row_vector\nprint(\"\\nBroadcasting (A + [10, 20]):\\n\", broadcasted)\n\n# 3. Statistical summary along axes\nprint(\"\\nColumn-wise mean (axis=0):\", np.mean(A, axis=0))\nprint(\"Row-wise sum (axis=1):\", np.sum(A, axis=1))\n",
    "expectedOutput": "Matrix A:\n [[1 2]\n [3 4]]\nMatrix B:\n [[5 6]\n [7 8]]\n\nElement-wise product (A * B):\n [[ 5 12]\n [21 32]]\n\nMatrix Dot Product (np.dot(A, B)):\n [[19 22]\n [43 50]]\n\nBroadcasting (A + [10, 20]):\n [[11 22]\n [13 24]]\n\nColumn-wise mean (axis=0): [2. 3.]\nRow-wise sum (axis=1): [3 7]",
    "tags": [
      "NumPy",
      "Broadcasting",
      "Matrix Operations",
      "ufuncs"
    ]
  },
  {
    "id": "2a",
    "moduleId": 1,
    "expNumber": 2,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "2_0",
    "title": "Pandas Series & DataFrame Construction & Querying",
    "aim": "To construct Pandas Series and DataFrames from Python dictionaries, inspect row and column metadata, and filter records using boolean conditions and queries.",
    "coreConcepts": [
      "Pandas Series vs 2D DataFrame structures",
      "loc[] (label-based) vs iloc[] (integer position-based)",
      "Conditional filtering and query() syntax"
    ],
    "syntax": "df = pd.DataFrame(data)\ndf.loc[condition, columns]\ndf.query('column > value')",
    "html": "<h3>Aim</h3><p>To construct Pandas Series and DataFrames from Python dictionaries, inspect row and column metadata, and filter records using boolean conditions and queries.</p><h3>Procedure</h3><ol><li>Create a dataset dictionary containing student records.</li><li>Convert dictionary into a Pandas DataFrame.</li><li>Select columns using label and integer indexers.</li><li>Query records based on multiple filter criteria.</li></ol>",
    "initialCode": "import pandas as pd\n\n# 1. Create a DataFrame from dictionary\ndata = {\n    'StudentID': [101, 102, 103, 104, 105],\n    'Name': ['Aarav', 'Bhavya', 'Chirag', 'Divya', 'Eshwar'],\n    'Department': ['Data Science', 'AI', 'Data Science', 'CSE', 'AI'],\n    'GPA': [8.9, 9.4, 7.8, 8.5, 9.1],\n    'Credits': [75, 82, 68, 79, 85]\n}\n\ndf = pd.DataFrame(data)\nprint(\"=== Student DataFrame ===\")\nprint(df)\n\n# 2. DataFrame Metadata\nprint(\"\\nDataFrame Shape:\", df.shape)\nprint(\"Columns:\", list(df.columns))\n\n# 3. Filtering using boolean conditions\ntop_students = df[(df['GPA'] >= 8.5) & (df['Department'] == 'Data Science')]\nprint(\"\\nTop Data Science Students (GPA >= 8.5):\")\nprint(top_students[['StudentID', 'Name', 'GPA']])\n\n# 4. Sorting\nsorted_df = df.sort_values(by='GPA', ascending=False)\nprint(\"\\nStudents Ranked by GPA:\")\nprint(sorted_df[['Name', 'Department', 'GPA']])\n",
    "expectedOutput": "=== Student DataFrame ===\n   StudentID    Name    Department  GPA  Credits\n0        101   Aarav  Data Science  8.9       75\n1        102  Bhavya            AI  9.4       82\n2        103  Chirag  Data Science  7.8       68\n3        104   Divya           CSE  8.5       79\n4        105  Eshwar            AI  9.1       85\n\nDataFrame Shape: (5, 5)\nColumns: ['StudentID', 'Name', 'Department', 'GPA', 'Credits']\n\nTop Data Science Students (GPA >= 8.5):\n   StudentID   Name  GPA\n0        101  Aarav  8.9\n\nStudents Ranked by GPA:\n     Name    Department  GPA\n1  Bhavya            AI  9.4\n4  Eshwar            AI  9.1\n0   Aarav  Data Science  8.9\n3   Divya           CSE  8.5\n2  Chirag  Data Science  7.8",
    "tags": [
      "Pandas",
      "DataFrame",
      "Filtering",
      "Querying"
    ]
  },
  {
    "id": "3a",
    "moduleId": 2,
    "expNumber": 3,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "3_0",
    "title": "Data Cleaning, Handling Missing Values & Imputation",
    "aim": "To identify missing and null values in tabular data, evaluate drop strategies, and execute statistical imputation using mean, median, and forward fill techniques.",
    "coreConcepts": [
      "Missing data mechanisms: MCAR, MAR, MNAR",
      "Detection via isnull(), isna(), info()",
      "Imputation strategies using fillna() and SimpleImputer"
    ],
    "syntax": "df.isnull().sum()\ndf.dropna(axis=0)\ndf['col'].fillna(df['col'].mean(), inplace=True)",
    "html": "<h3>Aim</h3><p>To identify missing and null values in tabular data, evaluate drop strategies, and execute statistical imputation using mean, median, and forward fill techniques.</p><h3>Procedure</h3><ol><li>Synthesize a raw dataset containing NaN missing values.</li><li>Compute total missing values per feature.</li><li>Impute numerical columns with mean/median.</li><li>Verify that no nulls remain in the sanitized dataset.</li></ol>",
    "initialCode": "import pandas as pd\nimport numpy as np\n\n# Create synthetic dataset with missing values\nraw_data = {\n    'Item': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Printer', 'Headphones'],\n    'Price': [65000, 1200, np.nan, 18000, np.nan, 2500],\n    'Stock': [15, np.nan, 45, 10, 8, np.nan],\n    'Category': ['Electronics', 'Accessories', 'Accessories', np.nan, 'Electronics', 'Accessories']\n}\n\ndf = pd.DataFrame(raw_data)\nprint(\"=== Original Raw Data ===\")\nprint(df)\n\n# Check missing count\nprint(\"\\nMissing values count:\")\nprint(df.isnull().sum())\n\n# Strategy: Impute Price with median, Stock with mean, Category with mode\ndf_clean = df.copy()\ndf_clean['Price'] = df_clean['Price'].fillna(df_clean['Price'].median())\ndf_clean['Stock'] = df_clean['Stock'].fillna(df_clean['Stock'].mean().round())\ndf_clean['Category'] = df_clean['Category'].fillna(df_clean['Category'].mode()[0])\n\nprint(\"\\n=== Cleaned & Imputed Dataset ===\")\nprint(df_clean)\n",
    "expectedOutput": "=== Cleaned dataset with missing values replaced ===",
    "tags": [
      "Data Cleaning",
      "Imputation",
      "NaN Handling",
      "Pandas"
    ]
  },
  {
    "id": "4a",
    "moduleId": 2,
    "expNumber": 4,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "4_0",
    "title": "Create a Pandas Series with hierarchical (multi-level) in...",
    "aim": "To create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and to select subsets of data using partial indexing at the outer and inner levels.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 4a Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "pd.MultiIndex.from_arrays(arrays, names=None)",
    "html": "<h3>Aim</h3><p>To create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and to select subsets of data using partial indexing at the outer and inner levels.</p><p>Syntax</p><p>pd.MultiIndex.from_arrays(arrays, names=None)</p><p>To create a Series:</p><p>pd.Series(data, index=multi_index)</p><p>To select data:</p><p>series.loc[&#x27;Outer_Level&#x27;]</p><p>series.loc[(&#x27;Outer_Level&#x27;, &#x27;Inner_Level&#x27;)]</p><p>Solution Program<br>### Output</p><p>Original Series:</p><p>Department   Branch</p><p>Engineering  CSE       85</p><p>             ECE       78</p><p>Science      Physics   92</p><p>             Chemistry 88</p><p>dtype: int64</p><p>Data for Engineering:</p><p>Branch</p><p>CSE    85</p><p>ECE    78</p><p>dtype: int64</p><p>Data for CSE:</p><p>85</p><p>Data for Science:</p><p>Branch</p><p>Physics      92</p><p>Chemistry    88</p><p>dtype: int64</p><h3>Explanation</h3><p>- MultiIndex.from_arrays() creates a hierarchical index with two levels:</p><p>- Outer level: Department</p><p>- Inner level: Branch</p><p>- marks.loc[&#x27;Engineering&#x27;] selects all records under the outer level Engineering.</p><p>- marks.loc[(&#x27;Engineering&#x27;, &#x27;CSE&#x27;)] selects a specific value using both outer and inner levels.</p><p>- marks.loc[&#x27;Science&#x27;] selects all records belonging to the Science department.</p><p>Result: The program successfully demonstrates hierarchical indexing and partial indexing at both outer and inner levels in Pandas.</p><p>B). Rearrange the tabular data with hierarchical indexing using unstack and stack method.</p>",
    "initialCode": "import pandas as pd\n# Create a list of lists for hierarchical index\nindex = [\n    ['Engineering', 'Engineering', 'Science', 'Science'],\n    ['CSE', 'ECE', 'Physics', 'Chemistry']\n]\n# Create MultiIndex\nmulti_index = pd.MultiIndex.from_arrays(\n    index,\n    names=['Department', 'Branch']\n)\n# Create a Series using the hierarchical index\nmarks = pd.Series(\n    [85, 78, 92, 88],\n    index=multi_index\n)\nprint(\"Original Series:\")\nprint(marks)\n# Partial indexing at the outer level\nprint(\"\\nData for Engineering:\")\nprint(marks.loc['Engineering'])\n# Partial indexing at the inner level\nprint(\"\\nData for CSE:\")\nprint(marks.loc[('Engineering', 'CSE')])\n# Selecting a subset using both levels\nprint(\"\\nData for Science:\")\nprint(marks.loc['Science'])",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Pandas",
      "MultiIndex",
      "Stack/Unstack",
      "Merging"
    ]
  },
  {
    "id": "4b",
    "moduleId": 2,
    "expNumber": 4,
    "partIndex": 1,
    "partLetter": "b",
    "codeKey": "4_1",
    "title": "Rearrange tabular data with hierarchical indexing using t...",
    "aim": "To rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 4b Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.</p><h3>Syntax</h3><h3>unstack()</h3><p>Converts one level of a hierarchical row index into columns.</p><h3>Syntax</h3><h3>unstack()</h3><p>Converts one level of a hierarchical row index into columns.</p><p>DataFrame.unstack(level=-1)</p><p>or</p><p>Series.unstack(level=-1)</p><h3>stack()</h3><p>Converts columns into a hierarchical row index.</p><p>DataFrame.stack()</p><p>or</p><p>Series.stack()</p><h3>4. Dat Solution Program\n## Output</h3><p>Original Tabular Data:</p><p>                       2025  2026</p><p>Department   Branch</p><p>Engineering  CSE          85    90</p><p>             ECE          78    82</p><p>Science      Physics      92    95</p><p>             Chemistry    88    91</p><p>Data after Unstack():</p><p>             2025                    2026</p><p>Branch        CSE ECE Chemistry Physics CSE ECE Chemistry Physics</p><p>Department</p><p>Engineering     85  78       NaN     NaN  90  82       NaN     NaN</p><p>Science        NaN NaN      88.0    92.0 NaN NaN      91.0    95.0</p><p>Data after Stack():</p><p>Department   Branch</p><p>Engineering  CSE          85    90</p><p>             ECE          78    82</p><p>Science      Chemistry    88    91</p><p>             Physics      92    95</p><p>dtype: int64</p><h3>Explanation</h3><p>- Hierarchical Indexing:<br>Department and Branch form the two levels of the hierarchical index.</p><p>- unstack() method:</p><p>data.unstack()</p><p>Moves the inner index (Branch) from the rows to the columns.</p><p>- stack() method:</p><p>unstacked_data.stack()</p><p>Moves the column labels back into the hierarchical row index.</p><h3>Result</h3><p>The unstack() method converts row-level hierarchical indexes into columns, while the stack() method converts columns back into hierarchical row indexes.</p>",
    "initialCode": "import pandas as pd\n# Create hierarchical index\nindex = pd.MultiIndex.from_tuples(\n    [\n        ('Engineering', 'CSE'),\n        ('Engineering', 'ECE'),\n        ('Science', 'Physics'),\n        ('Science', 'Chemistry')\n    ],\n    names=['Department', 'Branch']\n)\n# Create tabular data\ndata = pd.DataFrame(\n    {\n        '2025': [85, 78, 92, 88],\n        '2026': [90, 82, 95, 91]\n    },\n    index=index\n)\nprint(\"Original Tabular Data:\")\nprint(data)\n# Unstack the inner level\nunstacked_data = data.unstack()\nprint(\"\\nData after Unstack():\")\nprint(unstacked_data)\n# Stack the data back\nstacked_data = unstacked_data.stack()\nprint(\"\\nData after Stack():\")\nprint(stacked_data)",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Pandas",
      "MultiIndex",
      "Stack/Unstack",
      "Merging"
    ]
  },
  {
    "id": "4c",
    "moduleId": 2,
    "expNumber": 4,
    "partIndex": 2,
    "partLetter": "c",
    "codeKey": "4_2",
    "title": "Create two different Pandas DataFrames, merge them using ...",
    "aim": "To create two different Pandas DataFrames, merge them using the index as the merge key, and combine their data using the combine_first() method to fill missing values with available values from another DataFrame.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 4c Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create two different Pandas DataFrames, merge them using the index as the merge key, and combine their data using the combine_first() method to fill missing values with available values from another DataFrame.</p><h3>Syntax</h3><h3>Merge using index</h3><p>pd.merge(df1, df2, left_index=True, right_index=True)</p><h3>combine_first()</h3><p>df1.combine_first(df2)</p><p>The combine_first() method fills the missing (NaN) values in the first DataFrame with corresponding values from the second DataFrame.</p><h3>Solution Program\n## Output</h3><p>First DataFrame:</p><p>      Name  Marks Grade</p><p>101   Ravi   85.0     A</p><p>102   Sita    NaN     B</p><p>103   Arun   78.0  None</p><p>Second DataFrame:</p><p>      Name  Marks Grade</p><p>101   Ravi   90.0  None</p><p>102   Sita   88.0     A</p><p>104  Kiran   82.0     B</p><p>Merged DataFrame:</p><p>      Name_DF1  Marks_DF1 Grade_DF1 Name_DF2  Marks_DF2 Grade_DF2</p><p>101       Ravi       85.0         A     Ravi       90.0      None</p><p>102       Sita        NaN         B     Sita       88.0         A</p><p>103       Arun       78.0      None      NaN        NaN       NaN</p><p>104        NaN        NaN       NaN    Kiran       82.0         B</p><p>DataFrame after combine_first():</p><p>      Name  Marks Grade</p><p>101   Ravi   85.0     A</p><p>102   Sita   88.0     B</p><p>103   Arun   78.0  None</p><p>104  Kiran   82.0     B</p><h3>Explanation</h3><h3>1. Creating DataFrames</h3><p>Two DataFrames, df1 and df2, are created with student information. Their index values act as student IDs.</p><h3>2. Merging using index</h3><p>pd.merge(df1, df2, left_index=True, right_index=True, how=&#x27;outer&#x27;)</p><p>Here, the index is used as the merge key. The outer merge keeps all index values from both DataFrames.</p><h3>3. Combining overlapping data</h3><p>df1.combine_first(df2)</p><p>combine_first() uses values from df1 wherever they exist. If df1 contains a missing value, it takes the corresponding value from df2.</p><p>For example:</p><p>df1 Marks for 102 = NaN</p><p>df2 Marks for 102 = 88</p><p>After combine_first():</p><p>Marks for 102 = 88</p><h3>Result</h3><p>The program demonstrates both index-based merging and combining overlapping DataFrame data using combine_first().</p><h3>4. Data Wrangling</h3><p>a. Hierarchical Indexing</p><p>import pandas as pd<br>import numpy as np</p><p>data = pd.Series(np.random.randn(6),<br>                 index=[[&#x27;a&#x27;, &#x27;a&#x27;, &#x27;b&#x27;, &#x27;b&#x27;, &#x27;c&#x27;, &#x27;c&#x27;],<br>                        [1, 2, 1, 2, 1, 2]])<br>print(data)<br>print(data[&#x27;b&#x27;])<br>print(data[:, 1])</p><p>b. Stack and Unstack</p><p>df = data.unstack()<br>print(df)<br>print(df.stack())</p><p>c. Merge and Combine</p><p>df1 = pd.DataFrame({&#x27;a&#x27;: [1, np.nan, 3], &#x27;b&#x27;: [4, 5, 6]})<br>df2 = pd.DataFrame({&#x27;a&#x27;: [7, 8, 9], &#x27;b&#x27;: [np.nan, 11, 12]})</p><p>merged = df1.combine_first(df2)<br>print(merged)</p>",
    "initialCode": "import pandas as pd\n# Create the first DataFrame\ndf1 = pd.DataFrame(\n    {\n        'Name': ['Ravi', 'Sita', 'Arun'],\n        'Marks': [85, None, 78],\n        'Grade': ['A', 'B', None]\n    },\n    index=[101, 102, 103]\n)\n# Create the second DataFrame\ndf2 = pd.DataFrame(\n    {\n        'Name': ['Ravi', 'Sita', 'Kiran'],\n        'Marks': [90, 88, 82],\n        'Grade': [None, 'A', 'B']\n    },\n    index=[101, 102, 104]\n)\nprint(\"First DataFrame:\")\nprint(df1)\nprint(\"\\nSecond DataFrame:\")\nprint(df2)\n# Merge DataFrames using index as merge key\nmerged = pd.merge(\n    df1,\n    df2,\n    left_index=True,\n    right_index=True,\n    how='outer',\n    suffixes=('_DF1', '_DF2')\n)\nprint(\"\\nMerged DataFrame:\")\nprint(merged)\n# Combine data using combine_first()\ncombined = df1.combine_first(df2)\nprint(\"\\nDataFrame after combine_first():\")\nprint(combined)",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Pandas",
      "MultiIndex",
      "Stack/Unstack",
      "Merging"
    ]
  },
  {
    "id": "5a",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "5_0",
    "title": "Perform data visualization using Matplotlib and Seaborn b...",
    "aim": "To perform data visualization using Matplotlib and Seaborn by loading an online dataset, processing the data, and representing it using different types of plots such as line plot, bar plot, histogram, and scatter plot.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5a Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To perform data visualization using Matplotlib and Seaborn by loading an online dataset, processing the data, and representing it using different types of plots such as line plot, bar plot, histogram, and scatter plot.</p><h3>Software Requirements</h3><p>- Python 3.x</p><p>- Pandas</p><p>- Matplotlib</p><p>- Seaborn</p><p>- Jupyter Notebook / Google Colab / Python IDE</p><h3>Syntax</h3><h3>Read an online CSV dataset</h3><p>pd.read_csv(&quot;URL&quot;)</p><h3>Matplotlib plot</h3><p>plt.plot(x, y)</p><p>plt.xlabel(&quot;X-axis&quot;)</p><p>plt.ylabel(&quot;Y-axis&quot;)</p><p>plt.title(&quot;Title&quot;)</p><p>plt.show()</p><h3>Seaborn plot</h3><p>sns.scatterplot(data=df, x=&quot;column1&quot;, y=&quot;column2&quot;)</p><h3>Solution Program\n## Expected Output</h3><h3>1. Dataset Preview</h3><p>First Five Records:</p><p>   sepal_length  sepal_width  petal_length  petal_width species</p><p>0           5.1          3.5           1.4          0.2  setosa</p><p>1           4.9          3.0           1.4          0.2  setosa</p><p>2           4.7          3.2           1.3          0.2  setosa</p><p>3           4.6          3.1           1.5          0.2  setosa</p><p>4           5.0          3.6           1.4          0.2  setosa</p><h3>2. Statistical Summary</h3><p>       sepal_length  sepal_width  petal_length  petal_width</p><p>count    150.000000   150.000000    150.000000   150.000000</p><p>mean       5.843333     3.057333      3.758000     1.199333</p><p>std        0.828066     0.435866      1.765298     0.762238</p><p>min        4.300000     2.000000      1.000000     0.100000</p><p>max        7.900000     4.400000      6.900000     2.500000</p><h3>3. Visualizations</h3><p>The program produces:</p><p>- Line Plot: Sepal length and petal length across the observations.</p><p>- Scatter Plot: Relationship between sepal length and petal length, grouped by species.</p><p>- Histogram: Distribution of sepal length.</p><p>- Box Plot: Comparison of petal length among different species.</p><p>- Pair Plot: Relationships among the numerical features of the Iris dataset.</p><h3>Result</h3><p>The online Iris dataset was successfully loaded and processed using Pandas. Different data visualizations were successfully created using Matplotlib and Seaborn to understand distributions, relationships, and differences among the dataset variables.</p><h3>Create a Line Plot with Title, Axis Labels, Ticks, Tick Labels, Annotations and Save to a File</h3>",
    "initialCode": "The following program uses the Iris dataset available online.\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n# Load online dataset\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\n# Display first five records\nprint(\"First Five Records:\")\nprint(df.head())\n# Display dataset information\nprint(\"\\nDataset Information:\")\nprint(df.info())\n# Display statistical summary\nprint(\"\\nStatistical Summary:\")\nprint(df.describe())\n# ---------------------------------------------------\n# 1. Matplotlib - Line Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nplt.plot(df.index, df[\"sepal_length\"], label=\"Sepal Length\")\nplt.plot(df.index, df[\"petal_length\"], label=\"Petal Length\")\nplt.xlabel(\"Sample Index\")\nplt.ylabel(\"Length\")\nplt.title(\"Sepal Length and Petal Length\")\nplt.legend()\nplt.grid()\nplt.show()\n# ---------------------------------------------------\n# 2. Seaborn - Scatter Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nsns.scatterplot(\n    data=df,\n    x=\"sepal_length\",\n    y=\"petal_length\",\n    hue=\"species\"\n)\nplt.title(\"Sepal Length vs Petal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Petal Length\")\nplt.show()\n# ---------------------------------------------------\n# 3. Seaborn - Histogram\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nsns.histplot(\n    data=df,\n    x=\"sepal_length\",\n    hue=\"species\",\n    kde=True\n)\nplt.title(\"Distribution of Sepal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Frequency\")\nplt.show()\n# ---------------------------------------------------\n# 4. Seaborn - Box Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    data=df,\n    x=\"species\",\n    y=\"petal_length\"\n)\nplt.title(\"Petal Length by Species\")\nplt.xlabel(\"Species\")\nplt.ylabel(\"Petal Length\")\nplt.show()\n# ---------------------------------------------------\n# 5. Seaborn - Pair Plot\n# ---------------------------------------------------\nsns.pairplot(\n    df,\n    hue=\"species\"\n)\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5b",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 1,
    "partLetter": "b",
    "codeKey": "5_1",
    "title": "Create a line plot using Matplotlib by setting the title,...",
    "aim": "To create a line plot using Matplotlib by setting the title, axis labels, ticks, tick labels, and annotations on subplots, and save the generated plot to an image file.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5b Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create a line plot using Matplotlib by setting the title, axis labels, ticks, tick labels, and annotations on subplots, and save the generated plot to an image file.</p><h3>Syntax</h3><h3>Create subplots</h3><p>fig, ax = plt.subplots()</p><h3>Set title</h3><p>ax.set_title(&quot;Title&quot;)</p><h3>Set axis labels</h3><p>ax.set_xlabel(&quot;X-axis Label&quot;)</p><p>ax.set_ylabel(&quot;Y-axis Label&quot;)</p><h3>Set ticks and tick labels</h3><p>ax.set_xticks(x)</p><p>ax.set_xticklabels(labels)</p><h3>Add annotation</h3><p>ax.annotate(&quot;Text&quot;, xy=(x, y), xytext=(x1, y1),</p><p>            arrowprops=dict(arrowstyle=&quot;-&gt;&quot;))</p><h3>Save plot to a file</h3><p>plt.savefig(&quot;filename.png&quot;, dpi=300, bbox_inches=&quot;tight&quot;)</p><h3>Solution Program\n## Expected Output</h3><p>The program generates two subplots:</p><p>       Monthly Sales and Expenses Analysis</p><p>          Monthly Sales</p><p>Sales</p><p>250 |                         ● ← Highest Sales</p><p>220 |                    ●</p><p>180 |             ●</p><p>150 |        ●</p><p>120 |   ●</p><p>    +--------------------------------</p><p>       Jan  Feb  Mar  Apr  May  Jun</p><p>                    Month</p><p>          Monthly Expenses</p><p>Expenses</p><p>160 |                         ■ ← Highest Expense</p><p>140 |                    ■</p><p>120 |             ■</p><p>110 |        ■</p><p>100 |   ■</p><p> 80 | ●</p><p>    +--------------------------------</p><p>       Jan  Feb  Mar  Apr  May  Jun</p><p>                    Month</p><p>The actual Matplotlib output will display the plots graphically with titles, axis labels, customized ticks, tick labels, legends, grids, and arrow annotations.</p><h3>Output File</h3><p>The plot is saved as:</p><p>monthly_sales_expenses.png</p><p>at 300 DPI, making it suitable for reports and practical records.</p><h3>Result</h3><p>Thus, a line plot with titles, axis labels, ticks, tick labels, annotations, and multiple subplots was successfully created using Matplotlib and saved to an image file.</p><p>B). Create Bar Plots using Series and DataFrame index.</p><p>- Create bar plots with a DataFrame to group the values in each row together in a group in bars side by side for each value.</p><p>- Create stacked bar plots from a DataFrame.</p>",
    "initialCode": "import matplotlib.pyplot as plt\n# Data\nmonths = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\"]\nsales = [120, 150, 180, 160, 220, 250]\nexpenses = [80, 100, 120, 110, 140, 160]\n# Create subplots\nfig, ax = plt.subplots(2, 1, figsize=(10, 8))\n# --------------------------------------------------\n# Subplot 1: Sales\n# --------------------------------------------------\nax[0].plot(\n    months,\n    sales,\n    marker=\"o\",\n    linewidth=2,\n    label=\"Sales\"\n)\nax[0].set_title(\"Monthly Sales\")\nax[0].set_xlabel(\"Month\")\nax[0].set_ylabel(\"Sales\")\n# Set ticks and tick labels\nax[0].set_xticks(range(len(months)))\nax[0].set_xticklabels(months)\n# Annotation\nax[0].annotate(\n    \"Highest Sales\",\n    xy=(5, 250),\n    xytext=(3.5, 270),\n    arrowprops=dict(arrowstyle=\"->\")\n)\nax[0].legend()\nax[0].grid(True)\n# --------------------------------------------------\n# Subplot 2: Expenses\n# --------------------------------------------------\nax[1].plot(\n    months,\n    expenses,\n    marker=\"s\",\n    linewidth=2,\n    label=\"Expenses\"\n)\nax[1].set_title(\"Monthly Expenses\")\nax[1].set_xlabel(\"Month\")\nax[1].set_ylabel(\"Expenses\")\n# Set ticks and tick labels\nax[1].set_xticks(range(len(months)))\nax[1].set_xticklabels(months)\n# Annotation\nax[1].annotate(\n    \"Highest Expense\",\n    xy=(5, 160),\n    xytext=(3.5, 180),\n    arrowprops=dict(arrowstyle=\"->\")\n)\nax[1].legend()\nax[1].grid(True)\n# Overall title\nfig.suptitle(\"Monthly Sales and Expenses Analysis\", fontsize=16)\n# Adjust layout\nplt.tight_layout()\n# Save the plot to a file\nplt.savefig(\n    \"monthly_sales_expenses.png\",\n    dpi=300,\n    bbox_inches=\"tight\"\n)\n# Display the plot\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5c",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 2,
    "partLetter": "c",
    "codeKey": "5_2",
    "title": "Create bar plots using Pandas Series and DataFrame index,...",
    "aim": "To create bar plots using Pandas Series and DataFrame index, and to create both grouped bar plots and stacked bar plots using Matplotlib.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5c Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create bar plots using Pandas Series and DataFrame index, and to create both grouped bar plots and stacked bar plots using Matplotlib.</p><h3>i. Create Bar Plots with a DataFrame — Side-by-Side Bars</h3><h3>Syntax</h3><p>df.plot(kind=&#x27;bar&#x27;)</p><p>or</p><p>df.plot.bar()</p><p>For a horizontal bar plot:</p><p>df.plot(kind=&#x27;barh&#x27;)</p><h3>Solution Program\n### Output</h3><p>DataFrame:</p><p>          Python  Java  C++</p><p>Student1      85    75   80</p><p>Student2      90    82   76</p><p>Student3      78    80   85</p><p>Student4      88    85   90</p><p>The graphical output contains three bars side by side for each student:</p><p>- Python</p><p>- Java</p><p>- C++</p><p>For example:</p><p>Marks</p><p> 90 |        █</p><p> 85 | █      █       █</p><p> 80 | █  █   █   █   █</p><p> 75 | █  █   █   █   █</p><p>    +----------------------</p><p>      Student1 Student2 ...</p><p>Each row of the DataFrame is represented as a group of bars.</p><h3>ii. Create Stacked Bar Plots from a DataFrame</h3>",
    "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n# Create DataFrame\ndata = {\n    'Python': [85, 90, 78, 88],\n    'Java': [75, 82, 80, 85],\n    'C++': [80, 76, 85, 90]\n}\ndf = pd.DataFrame(\n    data,\n    index=['Student1', 'Student2', 'Student3', 'Student4']\n)\nprint(\"DataFrame:\")\nprint(df)\n# Create grouped bar plot\ndf.plot(\n    kind='bar',\n    figsize=(8, 5)\n)\nplt.title(\"Student Marks in Different Programming Languages\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5d",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 3,
    "partLetter": "d",
    "codeKey": "5_3",
    "title": "Create a stacked bar plot from a DataFrame, where the val...",
    "aim": "To create a stacked bar plot from a DataFrame, where the values of different columns are stacked on top of each other for each index value.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5d Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create a stacked bar plot from a DataFrame, where the values of different columns are stacked on top of each other for each index value.</p><h3>Syntax</h3><p>df.plot(kind=&#x27;bar&#x27;, stacked=True)</p><p>or</p><p>df.plot.bar(stacked=True)</p><h3>Solution Program\n## Output</h3><p>DataFrame:</p><p>          Python  Java  C++</p><p>Student1      85    75   80</p><p>Student2      90    82   76</p><p>Student3      78    80   85</p><p>Student4      88    85   90</p><p>The graphical output contains one bar for each student, with Python, Java, and C++ marks stacked vertically.</p><p>Total</p><p>250 |             █</p><p>200 |     █       █</p><p>150 | █   █   █   █</p><p>100 | █   █   █   █</p><p> 50 | █   █   █   █</p><p>    +----------------------</p><p>      S1  S2  S3  S4</p><h3>Difference Between Grouped and Stacked Bar Plots</h3><p>| Feature | Grouped Bar Plot | Stacked Bar Plot |<br>| --- | --- | --- |<br>| Bars | Side by side | On top of each other |<br>| Code | df.plot(kind=&#x27;bar&#x27;) | df.plot(kind=&#x27;bar&#x27;, stacked=True) |<br>| Comparison | Easy to compare individual values | Easy to see total and contribution |<br>| Number of bars | Multiple bars per index | One combined bar per index |</p><h3>Result</h3><p>Thus, grouped bar plots and stacked bar plots were successfully created from a Pandas DataFrame using its index values.</p><p>C). Create Histogram to display the value frequency and Density Plot to generate continuous probability distribution function for observed data.</p>",
    "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n# Create DataFrame\ndata = {\n    'Python': [85, 90, 78, 88],\n    'Java': [75, 82, 80, 85],\n    'C++': [80, 76, 85, 90]\n}\ndf = pd.DataFrame(\n    data,\n    index=['Student1', 'Student2', 'Student3', 'Student4']\n)\nprint(\"DataFrame:\")\nprint(df)\n# Create stacked bar plot\ndf.plot(\n    kind='bar',\n    stacked=True,\n    figsize=(8, 5)\n)\nplt.title(\"Stacked Bar Plot of Student Marks\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Total Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5e",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 4,
    "partLetter": "e",
    "codeKey": "5_4",
    "title": "Create a Histogram for displaying the frequency distribut...",
    "aim": "To create a Histogram for displaying the frequency distribution of observed data and a Density Plot for representing the continuous probability distribution of the data using Python, Pandas, Matplotlib, and Seaborn.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5e Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create a Histogram for displaying the frequency distribution of observed data and a Density Plot for representing the continuous probability distribution of the data using Python, Pandas, Matplotlib, and Seaborn.</p><h3>Syntax</h3><p>Histogram:</p><p>sns.histplot(data, bins=10, kde=False)</p><p>Density Plot:</p><p>sns.kdeplot(data, fill=True)</p><p>Histogram with Density Curve:</p><p>sns.histplot(data, bins=10, kde=True)</p><h3>Solution Program\n### Output</h3><p>Observed Data:</p><p>    Marks</p><p>0      45</p><p>1      50</p><p>2      52</p><p>3      55</p><p>4      58</p><p>5      60</p><p>6      62</p><p>7      65</p><p>8      68</p><p>9      70</p><p>10     72</p><p>11     75</p><p>12     78</p><p>13     80</p><p>14     82</p><p>15     85</p><p>16     88</p><p>17     90</p><p>18     92</p><p>19     95</p><h3>Graphical Output</h3><p>1. Histogram:<br>Displays the marks divided into intervals (bins), with the height of each bar representing the frequency of observations in that interval.</p><p>2. Density Plot:<br>Displays a smooth curve representing the estimated continuous probability distribution of the observed marks.</p><p>3. Combined Histogram + Density Plot can also be generated using:</p><p>sns.histplot(df[&#x27;Marks&#x27;], bins=6, kde=True)</p><p>plt.title(&quot;Histogram with Density Curve&quot;)</p><p>plt.xlabel(&quot;Marks&quot;)</p><p>plt.ylabel(&quot;Frequency / Density&quot;)</p><p>plt.show()</p><h3>Explanation</h3><p>- Histogram → shows how frequently values occur in different intervals.</p><p>- Density plot (KDE) → gives a smooth estimate of the underlying probability distribution.</p><p>- bins=6 divides the data into six intervals.</p><p>- kde=True adds the density curve to the histogram.</p><p>- fill=True fills the area under the density curve.</p><h3>Result</h3><p>Thus, a histogram and density plot were successfully created to visualize the frequency distribution and continuous probability distribution of the observed data.</p><h3>D). Create Scatter Plot and Examine the Relationship Between Two One-Dimensional Data Series</h3>",
    "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n# Sample observed data\ndata = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,\n        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]\n# Create DataFrame\ndf = pd.DataFrame({'Marks': data})\nprint(\"Observed Data:\")\nprint(df)\n# Create Histogram\nplt.figure(figsize=(8, 5))\nsns.histplot(df['Marks'], bins=6, kde=False)\nplt.title(\"Histogram of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Frequency\")\nplt.tight_layout()\nplt.show()\n# Create Density Plot\nplt.figure(figsize=(8, 5))\nsns.kdeplot(df['Marks'], fill=True)\nplt.title(\"Density Plot of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Density\")\nplt.tight_layout()\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5f",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 5,
    "partLetter": "f",
    "codeKey": "5_5",
    "title": "Create a Scatter Plot using two one-dimensional data seri...",
    "aim": "To create a Scatter Plot using two one-dimensional data series and examine the relationship or correlation between them using Python, Pandas, and Matplotlib.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5f Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create a Scatter Plot using two one-dimensional data series and examine the relationship or correlation between them using Python, Pandas, and Matplotlib.</p><h3>Syntax</h3><p>Matplotlib:</p><p>plt.scatter(x, y)</p><p>Pandas:</p><p>df.plot.scatter(x=&#x27;Column1&#x27;, y=&#x27;Column2&#x27;)</p><h3>Solution Program\n### Output</h3><p>Data:</p><p>   Study_Hours  Marks</p><p>0            1     45</p><p>1            2     50</p><p>2            3     55</p><p>3            4     60</p><p>4            5     65</p><p>5            6     70</p><p>6            7     72</p><p>7            8     80</p><p>8            9     85</p><p>9           10     90</p><p>Correlation Coefficient: 1.00</p><h3>Graphical Output</h3><p>The scatter plot contains:</p><p>- X-axis: Study Hours</p><p>- Y-axis: Marks</p><p>- Each point represents one observation.</p><p>- The points move upward as study hours increase, indicating a positive relationship between study hours and marks.</p><h3>Explanation</h3><p>A scatter plot is used to examine the relationship between two numerical variables.</p><p>- If points move upward, there is a positive relationship.</p><p>- If points move downward, there is a negative relationship.</p><p>- If points are randomly distributed, there may be little or no relationship.</p><p>- The correlation coefficient ranges from −1 to +1.</p><p>- +1 → perfect positive correlation</p><p>- 0 → no linear correlation</p><p>- −1 → perfect negative correlation</p><p>In this example, the correlation coefficient is approximately 1.00, showing a strong positive linear relationship between study hours and marks.</p><h3>Result</h3><p>Thus, the scatter plot was successfully created and the relationship between the two one-dimensional data series was examined using the correlation coefficient.</p><h3>Create Box Plots to Visualize Data with Many Categorical Variables</h3>",
    "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n# Two one-dimensional data series\nstudy_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nmarks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]\n# Create DataFrame\ndf = pd.DataFrame({\n    'Study_Hours': study_hours,\n    'Marks': marks\n})\nprint(\"Data:\")\nprint(df)\n# Create Scatter Plot\nplt.figure(figsize=(8, 5))\nplt.scatter(df['Study_Hours'], df['Marks'])\nplt.title(\"Relationship Between Study Hours and Marks\")\nplt.xlabel(\"Study Hours\")\nplt.ylabel(\"Marks\")\nplt.grid(True)\nplt.tight_layout()\nplt.show()\n# Calculate correlation\ncorrelation = df['Study_Hours'].corr(df['Marks'])\nprint(\"\\nCorrelation Coefficient:\", round(correlation, 2))",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "5g",
    "moduleId": 3,
    "expNumber": 5,
    "partIndex": 6,
    "partLetter": "g",
    "codeKey": "5_6",
    "title": "Create Box Plots for visualizing the distribution of nume...",
    "aim": "To create Box Plots for visualizing the distribution of numerical data across multiple categorical variables using Python, Pandas, Matplotlib, and Seaborn.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 5g Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create Box Plots for visualizing the distribution of numerical data across multiple categorical variables using Python, Pandas, Matplotlib, and Seaborn.</p><h3>Syntax</h3><p>Seaborn:</p><p>sns.boxplot(x=&#x27;Category&#x27;, y=&#x27;Value&#x27;, data=df)</p><p>Pandas:</p><p>df.boxplot(column=&#x27;Value&#x27;, by=&#x27;Category&#x27;)</p><h3>Solution Program\n### Output</h3><p>Data:</p><p>   Department  Marks</p><p>0         CSE     78</p><p>1         CSE     85</p><p>2         CSE     90</p><p>3         CSE     72</p><p>4         CSE     88</p><p>5         ECE     65</p><p>6         ECE     70</p><p>7         ECE     82</p><p>8         ECE     75</p><p>9         ECE     80</p><p>10        EEE     60</p><p>11        EEE     68</p><p>12        EEE     72</p><p>13        EEE     76</p><p>14        EEE     85</p><h3>Graphical Output</h3><p>The box plot displays one box for each category:</p><p>- CSE → distribution of CSE marks</p><p>- ECE → distribution of ECE marks</p><p>- EEE → distribution of EEE marks</p><p>Each box plot shows:</p><p>- Median – middle value</p><p>- Q1 – first quartile</p><p>- Q3 – third quartile</p><p>- IQR – Q3 − Q1</p><p>- Whiskers – range of typical observations</p><p>- Outliers – unusually high or low observations</p><h3>Explanation</h3><p>A Box Plot is useful when a dataset contains a numerical variable and one or more categorical variables. It allows the distributions of several categories to be compared in a single graph.</p><p>For example, in this program, Department is the categorical variable, while Marks is the numerical variable.</p><p>The following statement creates the box plot:</p><p>sns.boxplot(x=&#x27;Department&#x27;, y=&#x27;Marks&#x27;, data=df)</p><p>Here:</p><p>- x=&#x27;Department&#x27; places categories on the X-axis.</p><p>- y=&#x27;Marks&#x27; places numerical values on the Y-axis.</p><p>- data=df specifies the DataFrame.</p><h3>Result</h3><p>Thus, the Box Plot was successfully created to visualize and compare the distribution of numerical data across multiple categorical variables.</p><h3>5. Data Visualization with Matplotlib and Seaborn</h3><p>a. Line Plot</p><p>import matplotlib.pyplot as plt</p><p>x = [1, 2, 3, 4]<br>y = [10, 20, 25, 30]<br>plt.plot(x, y)<br>plt.title(&quot;Line Plot&quot;)<br>plt.xlabel(&quot;X-axis&quot;)<br>plt.ylabel(&quot;Y-axis&quot;)<br>plt.grid(True)<br>plt.savefig(&quot;line_plot.png&quot;)<br>plt.show()</p><p>b. Bar Plots</p><p>import pandas as pd<br>df = pd.DataFrame({&#x27;Category&#x27;: [&#x27;A&#x27;, &#x27;B&#x27;, &#x27;C&#x27;], &#x27;Values&#x27;: [10, 20, 15]})<br>df.plot(kind=&#x27;bar&#x27;, x=&#x27;Category&#x27;, y=&#x27;Values&#x27;)<br>plt.title(&quot;Bar Plot&quot;)<br>plt.show()</p><p>c. Histogram and Density Plot</p><p>import seaborn as sns<br>import numpy as np<br>data = np.random.randn(1000)<br>sns.histplot(data, kde=True)<br>plt.title(&quot;Histogram and Density&quot;)<br>plt.show()</p><p>d. Scatter Plot</p><p>x = np.random.rand(50)<br>y = np.random.rand(50)<br>plt.scatter(x, y)<br>plt.title(&quot;Scatter Plot&quot;)<br>plt.xlabel(&quot;x&quot;)<br>plt.ylabel(&quot;y&quot;)<br>plt.show()</p><p>e. Box Plot</p><p>sns.boxplot(data=np.random.randn(100, 4))<br>plt.title(&quot;Box Plot&quot;)<br>plt.show()</p>",
    "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n# Create sample data\ndata = {\n    'Department': [\n        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',\n        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',\n        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'\n    ],\n    'Marks': [\n        78, 85, 90, 72, 88,\n        65, 70, 82, 75, 80,\n        60, 68, 72, 76, 85\n    ]\n}\ndf = pd.DataFrame(data)\nprint(\"Data:\")\nprint(df)\n# Create Box Plot\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    x='Department',\n    y='Marks',\n    data=df\n)\nplt.title(\"Marks Distribution by Department\")\nplt.xlabel(\"Department\")\nplt.ylabel(\"Marks\")\nplt.grid(axis='y', linestyle='--', alpha=0.5)\nplt.tight_layout()\nplt.show()",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
      "Plots"
    ]
  },
  {
    "id": "6a",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "6_0",
    "title": "Create a time series in Pandas using datetime objects and...",
    "aim": "To create a time series in Pandas using datetime objects and use the timestamps as the index of the time series.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6a Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To create a time series in Pandas using datetime objects and use the timestamps as the index of the time series.</p><h3>Syntax</h3><p>pd.to_datetime(date_values)</p><p>pd.Series(data, index=datetime_index)</p><p>General syntax:</p><p>import pandas as pd</p><p>dates = pd.to_datetime([...])</p><p>series = pd.Series(data, index=dates)</p><h3>Program Solution\n## Output</h3><p>Time Series:</p><p>2026-01-01    28</p><p>2026-01-02    30</p><p>2026-01-03    29</p><p>2026-01-04    31</p><p>2026-01-05    32</p><p>dtype: int64</p><p>The index of the Series consists of timestamps, while the corresponding values represent the temperature recorded on each date.</p><p>Use pandas.date_range to generate a Datetimelndex with an indicated length.</p>",
    "initialCode": "import pandas as pd\n# Create datetime objects\ndates = pd.to_datetime([\n    '2026-01-01',\n    '2026-01-02',\n    '2026-01-03',\n    '2026-01-04',\n    '2026-01-05'\n])\n# Create data\ntemperature = [28, 30, 29, 31, 32]\n# Create time series with timestamps as index\ntime_series = pd.Series(\n    temperature,\n    index=dates\n)\n# Display the time series\nprint(\"Time Series:\")\nprint(time_series)",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6b",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 1,
    "partLetter": "b",
    "codeKey": "6_1",
    "title": "Generate a DatetimeIndex of a specified length using the ...",
    "aim": "To generate a DatetimeIndex of a specified length using the pandas.date_range() function.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6b Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To generate a DatetimeIndex of a specified length using the pandas.date_range() function.</p><h3>Syntax</h3><p>pd.date_range(start=None, end=None, periods=None, freq=&#x27;D&#x27;)</p><h3>Important Parameters</h3><p>- start – Starting date/time.</p><p>- end – Ending date/time.</p><p>- periods – Number of timestamps to generate.</p><p>- freq – Frequency of timestamps, such as D (daily), h (hourly), M (monthly).</p><p>For a specified length, the commonly used syntax is:</p><p>pd.date_range(start=&#x27;YYYY-MM-DD&#x27;, periods=n, freq=&#x27;D&#x27;)</p><h3>Program Solution\n## Output</h3><p>Generated DatetimeIndex:</p><p>DatetimeIndex([&#x27;2026-01-01&#x27;, &#x27;2026-01-02&#x27;, &#x27;2026-01-03&#x27;,</p><p>               &#x27;2026-01-04&#x27;, &#x27;2026-01-05&#x27;, &#x27;2026-01-06&#x27;,</p><p>               &#x27;2026-01-07&#x27;],</p><p>              dtype=&#x27;datetime64[ns]&#x27;, freq=&#x27;D&#x27;)</p><h3>Explanation</h3><p>The pd.date_range() function is used to generate a sequence of dates at regular intervals.</p><p>In the program:</p><p>pd.date_range(</p><p>    start=&#x27;2026-01-01&#x27;,</p><p>    periods=7,</p><p>    freq=&#x27;D&#x27;</p><p>)</p><h3>Step-by-step</h3><p>- start=&#x27;2026-01-01&#x27;<br>Specifies the starting date.</p><p>- periods=7<br>Specifies that exactly 7 timestamps should be generated.</p><p>- freq=&#x27;D&#x27;<br>Specifies a daily frequency, so each timestamp is one day apart.</p><p>The resulting object is a DatetimeIndex.</p><p>Use pandas.date_range to generate a Datetimelndex with an indicated length.</p>",
    "initialCode": "import pandas as pd\n# Generate a DatetimeIndex with 7 dates\ndate_index = pd.date_range(\n    start='2026-01-01',\n    periods=7,\n    freq='D'\n)\n# Display the DatetimeIndex\nprint(\"Generated DatetimeIndex:\")\nprint(date_index)",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6c",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 2,
    "partLetter": "c",
    "codeKey": "6_2",
    "title": "Generate date ranges by setting a time zone, localizing a...",
    "aim": "To generate date ranges by setting a time zone, localizing a time zone, converting timestamps to another time zone using tz_convert(), and combining time-series data from two different time zones using Pandas.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6c Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To generate date ranges by setting a time zone, localizing a time zone, converting timestamps to another time zone using tz_convert(), and combining time-series data from two different time zones using Pandas.</p><h3>Syntax</h3><h3>1. Generate date range with a time zone</h3><p>pd.date_range(start, periods=n, freq=&#x27;h&#x27;, tz=&#x27;Asia/Kolkata&#x27;)</p><h3>2. Localize a time zone</h3><p>datetime_index.tz_localize(&#x27;Asia/Kolkata&#x27;)</p><h3>3. Convert to another time zone</h3><p>datetime_index.tz_convert(&#x27;America/New_York&#x27;)</p><h3>4. Combine time series</h3><p>pd.concat([series1, series2])</p><h3>Program Solution</h3>",
    "initialCode": "import pandas as pd\n--------------------------------------------------\n# 1. Generate date range by setting a time zone\n--------------------------------------------------\nindia_dates = pd.date_range(\n    start='2026-01-01 09:00',\n    periods=3,\n    freq='h',\n    tz='Asia/Kolkata'\n)\nprint(\"1. Date Range with Asia/Kolkata Time Zone:\")\nprint(india_dates)\n--------------------------------------------------\n# 2. Create a timezone-naive DatetimeIndex\n--------------------------------------------------\ndates = pd.date_range(\n    start='2026-01-01 09:00',\n    periods=3,\n    freq='h'\n)\nprint(\"\\n2. Timezone-naive Date Range:\")\nprint(dates)\n--------------------------------------------------\n# 3. Localize the timezone\n--------------------------------------------------\nlocalized_dates = dates.tz_localize('Asia/Kolkata')\nprint(\"\\n3. After Localizing to Asia/Kolkata:\")\nprint(localized_dates)\n--------------------------------------------------\n# 4. Convert to another timezone using tz_convert()\n--------------------------------------------------\nnew_york_dates = localized_dates.tz_convert(\n    'America/New_York'\n)\nprint(\"\\n4. Converted to America/New_York:\")\nprint(new_york_dates)\n-------------------------------------------------\n# 5. Create another time series in a different\n   timezone\n--------------------------------------------------\nindia_series = pd.Series(\n    [100, 200, 300],\n    index=localized_dates\n)\nnew_york_series = pd.Series(\n    [400, 500, 600],\n    index=new_york_dates\n)\nprint(\"\\n5. India Time Series:\")\nprint(india_series)\nprint(\"\\nNew York Time Series:\")\nprint(new_york_series)\n--------------------------------------------------\n# 6. Combine two different timezone series\n--------------------------------------------------\ncombined_series = pd.concat([\n    india_series,\n    new_york_series\n])\nprint(\"\\n6. Combined Time Series:\")\nprint(combined_series)\n# Sample Output\n### 1. Date Range with Time Zone\n# 1. Date Range with Asia/Kolkata Time Zone:\nDatetimeIndex(['2026-01-01 09:00:00+05:30',\n               '2026-01-01 10:00:00+05:30',\n               '2026-01-01 11:00:00+05:30'],\n              dtype='datetime64[ns, Asia/Kolkata]', freq='h')\n### 2. Timezone-Naive Date Range\n# 2. Timezone-naive Date Range:\nDatetimeIndex(['2026-01-01 09:00:00',\n               '2026-01-01 10:00:00',\n               '2026-01-01 11:00:00'],\n              dtype='datetime64[ns]', freq='h')\n### 3. Localized Time Zone\n# 3. After Localizing to Asia/Kolkata:\nDatetimeIndex(['2026-01-01 09:00:00+05:30',\n               '2026-01-01 10:00:00+05:30',\n               '2026-01-01 11:00:00+05:30'],\n              dtype='datetime64[ns, Asia/Kolkata]', freq='h')\n### 4. Converted to New York Time\n# 4. Converted to America/New_York:\nDatetimeIndex(['2025-12-31 22:30:00-05:00',\n               '2025-12-31 23:30:00-05:00',\n               '2026-01-01 00:30:00-05:00'],\n              dtype='datetime64[ns, America/New_York]', freq='h')\n### 5. Time Series\n# 5. India Time Series:\n2026-01-01 09:00:00+05:30    100\n2026-01-01 10:00:00+05:30    200\n2026-01-01 11:00:00+05:30    300\ndtype: int64\nNew York Time Series:\n2025-12-31 22:30:00-05:00    400\n2025-12-31 23:30:00-05:00    500\n2026-01-01 00:30:00-05:00    600\ndtype: int64\n### 6. Combined Time Series\n# 6. Combined Time Series:\n2025-12-31 22:30:00-05:00    400\n2025-12-31 23:30:00-05:00    500\n2026-01-01 00:30:00-05:00    600\n2026-01-01 09:00:00+05:30    100\n2026-01-01 10:00:00+05:30    200\n2026-01-01 11:00:00+05:30    300\ndtype: int64\nPerform period arithmetic such as adding and subtracting integers from periods and construct range of periods using period_range function.",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6d",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 3,
    "partLetter": "d",
    "codeKey": "6_3",
    "title": "Perform period arithmetic by adding and subtracting integ...",
    "aim": "To perform period arithmetic by adding and subtracting integers from Pandas Period objects and to construct a range of periods using the period_range() function.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6d Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To perform period arithmetic by adding and subtracting integers from Pandas Period objects and to construct a range of periods using the period_range() function.</p><h3>Syntax</h3><h3>1. Create a Period</h3><p>pd.Period(&#x27;2026-01&#x27;, freq=&#x27;M&#x27;)</p><h3>2. Add an integer to a Period</h3><p>period + integer</p><h3>3. Subtract an integer from a Period</h3><p>period - integer</p><h3>4. Construct a range of periods</h3><p>pd.period_range(start, periods=n, freq=&#x27;M&#x27;)</p><h3>Program Solution</h3>",
    "initialCode": "import pandas as pd\n# Create a monthly Period\np = pd.Period('2026-01', freq='M')\nprint(\"Original Period:\")\nprint(p)\n# Add integers to the period\nprint(\"\\nAfter adding 2:\")\nprint(p + 2)\nprint(\"\\nAfter adding 5:\")\nprint(p + 5)\n# Subtract integers from the period\nprint(\"\\nAfter subtracting 1:\")\nprint(p - 1)\nprint(\"\\nAfter subtracting 3:\")\nprint(p - 3)\n# Create a range of monthly periods\nperiods = pd.period_range(\n    start='2026-01',\n    periods=6,\n    freq='M'\n)\nprint(\"\\nRange of Periods:\")\nprint(periods)\n# Sample Output\nOriginal Period:\n2026-01\nAfter adding 2:\n2026-03\nAfter adding 5:\n2026-06\nAfter subtracting 1:\n2025-12\nAfter subtracting 3:\n2025-10\nRange of Periods:\nPeriodIndex(['2026-01', '2026-02', '2026-03',\n             '2026-04', '2026-05', '2026-06'],\n            dtype='period[M]')\nConvert Periods and Periodlndex objects to another frequency with asfreq method.",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6e",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 4,
    "partLetter": "e",
    "codeKey": "6_4",
    "title": "Convert Pandas Period and PeriodIndex objects from one fr...",
    "aim": "To convert Pandas Period and PeriodIndex objects from one frequency to another using the asfreq() method.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6e Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To convert Pandas Period and PeriodIndex objects from one frequency to another using the asfreq() method.</p><h3>Syntax</h3><h3>1. Convert a Period to another frequency</h3><p>period.asfreq(freq, how=&#x27;start&#x27;)</p><h3>2. Convert a PeriodIndex to another frequency</h3><p>period_index.asfreq(freq, how=&#x27;start&#x27;)</p><h3>Parameters</h3><p>- freq – The target frequency, such as &#x27;D&#x27;, &#x27;M&#x27;, &#x27;Q&#x27;, or &#x27;Y&#x27;.</p><p>- how – Specifies whether to use the start or end of the period.</p><p>- &#x27;start&#x27; – Beginning of the period.</p><p>- &#x27;end&#x27; – End of the period.</p><h3>Program Solution</h3>",
    "initialCode": "import pandas as pd\n--------------------------------------------------\n# 1. Create a monthly Period\n---------------------------------------------------\np = pd.Period('2026-01', freq='M')\nprint(\"Original Period:\")\nprint(p)\n---------------------------------------------------\n# 2. Convert monthly Period to daily frequency\n---------------------------------------------------\ndaily_start = p.asfreq('D', how='start')\nprint(\"\\nMonthly Period converted to Daily (Start):\")\nprint(daily_start)\ndaily_end = p.asfreq('D', how='end')\nprint(\"\\nMonthly Period converted to Daily (End):\")\nprint(daily_end)\n---------------------------------------------------\n 3. Create a PeriodIndex\n ---------------------------------------------------\nperiod_index = pd.period_range(\n    start='2026-01',\n    periods=3,\n    freq='M'\n)\nprint(\"\\nOriginal PeriodIndex:\")\nprint(period_index)\n ---------------------------------------------------\n 4. Convert PeriodIndex to daily frequency\n ---------------------------------------------------\ndaily_period_index = period_index.asfreq(\n    'D',\n    how='start'\n)\nprint(\"\\nPeriodIndex converted to Daily Frequency:\")\nprint(daily_period_index)\n ---------------------------------------------------\n 5. Convert PeriodIndex to daily frequency at end\n ---------------------------------------------------\ndaily_period_index_end = period_index.asfreq(\n    'D',\n    how='end'\n)\nprint(\"\\nPeriodIndex converted to Daily Frequency (End):\")\nprint(daily_period_index_end)\n# Sample Output\nOriginal Period:\n2026-01\nMonthly Period converted to Daily (Start):\n2026-01-01\nMonthly Period converted to Daily (End):\n2026-01-31\nOriginal PeriodIndex:\nPeriodIndex(['2026-01', '2026-02', '2026-03'],\n            dtype='period[M]')\nPeriodIndex converted to Daily Frequency:\nPeriodIndex(['2026-01-01', '2026-02-01', '2026-03-01'],\n            dtype='period[D]')\nPeriodIndex converted to Daily Frequency (End):\nPeriodIndex(['2026-01-31', '2026-02-28', '2026-03-31'],\n            dtype='period[D]')\nConvert Series and DataFrame objects indexed by timestamps to periods with the to_period method.",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6f",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 5,
    "partLetter": "f",
    "codeKey": "6_5",
    "title": "Convert Series and DataFrame objects indexed by timestamp...",
    "aim": "To convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using the Pandas to_period() method.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6f Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using the Pandas to_period() method.</p><h3>Syntax</h3><h3>1. Convert a Series to a PeriodIndex</h3><p>series.to_period(freq)</p><h3>2. Convert a DataFrame to a PeriodIndex</h3><p>dataframe.to_period(freq)</p><p>Where:</p><p>- freq specifies the desired frequency.</p><p>- &#x27;D&#x27; → Daily</p><p>- &#x27;M&#x27; → Monthly</p><p>- &#x27;Q&#x27; → Quarterly</p><p>- &#x27;Y&#x27; → Yearly</p><h3>Program Solution</h3>",
    "initialCode": "import pandas as pd\n--------------------------------------------------\n 1. Create a Series with timestamp index\n--------------------------------------------------\ndates = pd.to_datetime([\n    '2026-01-10',\n    '2026-02-15',\n    '2026-03-20',\n    '2026-04-25'\n])\nsales = pd.Series(\n    [1000, 1500, 1800, 2200],\n    index=dates\n)\nprint(\"Original Series:\")\nprint(sales)\n--------------------------------------------------\n 2. Convert Series from timestamps to monthly periods\n-------------------------------------------------\nperiod_series = sales.to_period('M')\nprint(\"\\nSeries converted to Monthly Periods:\")\nprint(period_series)\n--------------------------------------------------\n# 3. Create a DataFrame with timestamp index\n--------------------------------------------------\ndf = pd.DataFrame(\n    {\n        'Sales': [1000, 1500, 1800, 2200],\n        'Profit': [200, 300, 400, 500]\n    },\n    index=dates\n)\nprint(\"\\nOriginal DataFrame:\")\nprint(df)\n --------------------------------------------------\n 4. Convert DataFrame to monthly periods\n --------------------------------------------------\nperiod_df = df.to_period('M')\nprint(\"\\nDataFrame converted to Monthly Periods:\")\nprint(period_df)\n# Sample Output\n### 1. Original Series\nOriginal Series:\n2026-01-10    1000\n2026-02-15    1500\n2026-03-20    1800\n2026-04-25    2200\ndtype: int64\n### 2. Series Converted to Monthly Periods\nSeries converted to Monthly Periods:\n2026-01    1000\n2026-02    1500\n2026-03    1800\n2026-04    2200\nFreq: M, dtype: int64\n### 3. Original DataFrame\nOriginal DataFrame:\n            Sales  Profit\n2026-01-10   1000     200\n2026-02-15   1500     300\n2026-03-20   1800     400\n2026-04-25   2200     500\n### 4. DataFrame Converted to Monthly Periods\nDataFrame converted to Monthly Periods:\n         Sales  Profit\n2026-01   1000     200\n2026-02   1500     300\n2026-03   1800     400\n2026-04   2200     500\nFreq: M\nPerform resampling, downsampling and upsampling for the time series.",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "6g",
    "moduleId": 3,
    "expNumber": 6,
    "partIndex": 6,
    "partLetter": "g",
    "codeKey": "6_6",
    "title": "Perform resampling, downsampling, and upsampling operatio...",
    "aim": "To perform resampling, downsampling, and upsampling operations on a time series using Pandas.",
    "coreConcepts": [
      "Data Science Practical Curriculum",
      "Experiment 6g Laboratory Module",
      "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
    ],
    "syntax": "Refer to syntax section in the theory tab.",
    "html": "<h3>Aim</h3><p>To perform resampling, downsampling, and upsampling operations on a time series using Pandas.</p><h3>Syntax</h3><h3>1. Resampling</h3><p>series.resample(&#x27;frequency&#x27;).aggregation_function()</p><p>Example:</p><p>series.resample(&#x27;D&#x27;).mean()</p><h3>2. Downsampling</h3><p>series.resample(&#x27;larger_frequency&#x27;).sum()</p><p>Example:</p><p>series.resample(&#x27;6h&#x27;).sum()</p><h3>3. Upsampling</h3><p>series.resample(&#x27;smaller_frequency&#x27;).asfreq()</p><p>or</p><p>series.resample(&#x27;smaller_frequency&#x27;).ffill()</p><h3>Program Solution</h3>",
    "initialCode": "import pandas as pd\n --------------------------------------------------\n 1. Create an hourly time series\n --------------------------------------------------\ndates = pd.date_range(\n    start='2026-01-01 00:00',\n    periods=12,\n    freq='h'\n)\nvalues = [10, 12, 15, 14, 18, 20,\n          22, 21, 25, 28, 30, 32]\ntime_series = pd.Series(\n    values,\n    index=dates\n)\nprint(\"Original Hourly Time Series:\")\nprint(time_series)\n --------------------------------------------------\n 2. Resampling - calculate 3-hourly mean\n --------------------------------------------------\nresampled = time_series.resample('3h').mean()\nprint(\"\\nResampled Time Series - 3 Hour Mean:\")\nprint(resampled)\n --------------------------------------------------\n 3. Downsampling - Hourly to 4-hourly\n --------------------------------------------------\ndownsampled = time_series.resample('4h').sum()\nprint(\"\\nDownsampled Time Series - 4 Hour Sum:\")\nprint(downsampled)\n --------------------------------------------------\n 4. Upsampling - Hourly to 30-minute intervals\n --------------------------------------------------\nupsampled = time_series.resample('30min').asfreq()\nprint(\"\\nUpsampled Time Series - 30 Minute:\")\nprint(upsampled)\n --------------------------------------------------\n 5. Upsampling with Forward Fill\n --------------------------------------------------\nupsampled_ffill = time_series.resample('30min').ffill()\nprint(\"\\nUpsampled Time Series using Forward Fill:\")\nprint(upsampled_ffill)\n# Sample Output\n## 1. Original Time Series\nOriginal Hourly Time Series:\n2026-01-01 00:00:00    10\n2026-01-01 01:00:00    12\n2026-01-01 02:00:00    15\n2026-01-01 03:00:00    14\n2026-01-01 04:00:00    18\n2026-01-01 05:00:00    20\n2026-01-01 06:00:00    22\n2026-01-01 07:00:00    21\n2026-01-01 08:00:00    25\n2026-01-01 09:00:00    28\n2026-01-01 10:00:00    30\n2026-01-01 11:00:00    32\nFreq: h, dtype: int64\n## 2. Resampling\nThe hourly data is resampled into 3-hour intervals and the mean is calculated.\nResampled Time Series - 3 Hour Mean:\n2026-01-01 00:00:00    12.333333\n2026-01-01 03:00:00    17.333333\n2026-01-01 06:00:00    22.666667\n2026-01-01 09:00:00    30.000000\nFreq: 3h, dtype: float64\nFor example:\n(10 + 12 + 15) / 3 = 12.33\n## 3. Downsampling\nHourly data is reduced to 4-hour intervals and the values are summed.\nDownsampled Time Series - 4 Hour Sum:\n2026-01-01 00:00:00    51\n2026-01-01 04:00:00    81\n2026-01-01 08:00:00    115\nFreq: 4h, dtype: int64\nFor example:\n10 + 12 + 15 + 14 = 51\n## 4. Upsampling\nHourly data is increased to 30-minute intervals.\nUpsampled Time Series - 30 Minute:\n2026-01-01 00:00:00    10.0\n2026-01-01 00:30:00     NaN\n2026-01-01 01:00:00    12.0\n2026-01-01 01:30:00     NaN\n2026-01-01 02:00:00    15.0\n2026-01-01 02:30:00     NaN\n2026-01-01 03:00:00    14.0\n...\nFreq: 30min, dtype: float64\nThe newly created 30-minute timestamps contain NaN because no original observation exists at those times.\n## 5. Upsampling Using Forward Fill\nThe missing values can be filled using ffill():\nUpsampled Time Series using Forward Fill:\n2026-01-01 00:00:00    10\n2026-01-01 00:30:00    10\n2026-01-01 01:00:00    12\n2026-01-01 01:30:00    12\n2026-01-01 02:00:00    15\n2026-01-01 02:30:00    15\n2026-01-01 03:00:00    14\n...\nFreq: 30min, dtype: int64\n# My Programs :\n# Time Series Analysis\na. Create Time Series\nrng = pd.date_range('2023-01-01', periods=6, freq='D')\nts = pd.Series(np.random.randn(len(rng)), index=rng)\nprint(ts)\nb. Time Zone Conversion\nts_utc = ts.tz_localize('UTC')\nts_ind = ts_utc.tz_convert('Asia/Kolkata')\nprint(ts_ind)\nc. Period Arithmetic and Conversion\np = pd.Period('2024Q1')\nprint(p + 1)\nprint(p.asfreq('M', 'end'))\nd. Resampling\nts = pd.Series(np.random.randn(100),\n               index=pd.date_range('2024-01-01', periods=100))\nts_monthly = ts.resample('M').mean()\nprint(ts_monthly)",
    "expectedOutput": "Executes without errors and outputs results to stdout / inline plot renderer.",
    "tags": [
      "Time Series",
      "Pandas",
      "DateTimeIndex",
      "Resampling"
    ]
  },
  {
    "id": "7a",
    "moduleId": 3,
    "expNumber": 7,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "7_0",
    "title": "Exploratory Data Analysis (EDA) & Correlation Heatmap",
    "aim": "To conduct an Exploratory Data Analysis (EDA) on a multi-feature dataset, analyze descriptive statistics, skewness, and visualize feature correlations using a Seaborn heatmap.",
    "coreConcepts": [
      "Parametric summaries: mean, std, 5-number summary",
      "Pearson correlation coefficient matrix",
      "Visualizing multi-collinearity using Seaborn heatmap"
    ],
    "syntax": "df.describe()\ndf.corr()\nsns.heatmap(corr, annot=True, cmap='coolwarm')",
    "html": "<h3>Aim</h3><p>To conduct an Exploratory Data Analysis (EDA) on a multi-feature dataset, analyze descriptive statistics, skewness, and visualize feature correlations using a Seaborn heatmap.</p><h3>Procedure</h3><ol><li>Generate a simulated dataset with multiple continuous features.</li><li>Compute statistical metrics (describe, skew).</li><li>Calculate the Pearson correlation matrix.</li><li>Plot a heatmap using Seaborn and Matplotlib.</li></ol>",
    "initialCode": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nnp.random.seed(42)\nn_samples = 150\nstudy_hours = np.random.uniform(2, 12, n_samples)\nattendance = np.clip(study_hours * 7 + np.random.normal(15, 6, n_samples), 40, 100)\nprev_score = np.random.uniform(50, 95, n_samples)\nfinal_score = np.clip(study_hours * 4.2 + attendance * 0.35 + prev_score * 0.25 + np.random.normal(0, 4, n_samples), 0, 100)\n\ndf = pd.DataFrame({\n    'StudyHours': study_hours,\n    'Attendance': attendance,\n    'PrevScore': prev_score,\n    'FinalScore': final_score\n})\n\nprint(\"=== Descriptive Statistics ===\")\nprint(df.describe().round(2))\n\ncorr_matrix = df.corr()\nprint(\"\\n=== Correlation Matrix ===\")\nprint(corr_matrix.round(3))\n\n# Plot Correlation Heatmap\nplt.figure(figsize=(7, 5))\nsns.heatmap(corr_matrix, annot=True, cmap='Blues', fmt='.2f', linewidths=0.5)\nplt.title(\"Academic Performance Correlation Heatmap\", fontsize=13, fontweight='bold', pad=12)\nplt.tight_layout()\nplt.show()\n",
    "expectedOutput": "Descriptive statistics printed to terminal; visual heatmap rendered showing positive correlation between StudyHours, Attendance and FinalScore.",
    "tags": [
      "EDA",
      "Correlation",
      "Heatmap",
      "Seaborn"
    ]
  },
  {
    "id": "8a",
    "moduleId": 4,
    "expNumber": 8,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "8_0",
    "title": "Feature Engineering: Scaling & One-Hot Encoding",
    "aim": "To demonstrate feature engineering techniques by scaling numerical attributes using StandardScaler and MinMaxScaler, and encoding categorical variables using One-Hot Encoding.",
    "coreConcepts": [
      "Standardization (Z-score normalization) vs Min-Max Normalization",
      "One-Hot Encoding for nominal categorical features",
      "Scikit-learn Transformer pipeline API"
    ],
    "syntax": "from sklearn.preprocessing import StandardScaler, MinMaxScaler, OneHotEncoder\nscaler = StandardScaler().fit_transform(X)",
    "html": "<h3>Aim</h3><p>To demonstrate feature engineering techniques by scaling numerical attributes using StandardScaler and MinMaxScaler, and encoding categorical variables using One-Hot Encoding.</p><h3>Procedure</h3><ol><li>Create a mixed dataset with categorical and numerical features.</li><li>Apply StandardScaler to normalize features to mean=0, std=1.</li><li>Apply One-Hot Encoding using <code>pd.get_dummies()</code>.</li><li>Inspect the transformed numerical feature space.</li></ol>",
    "initialCode": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n\n# Create a sample customer dataset\ndf = pd.DataFrame({\n    'Age': [22, 45, 33, 56, 28],\n    'Salary': [28000, 85000, 52000, 120000, 36000],\n    'City': ['Tirupati', 'Bangalore', 'Hyderabad', 'Bangalore', 'Tirupati'],\n    'Purchased': ['No', 'Yes', 'Yes', 'Yes', 'No']\n})\n\nprint(\"=== Original Dataset ===\")\nprint(df)\n\n# 1. One-Hot Encoding for categorical feature 'City'\ndf_encoded = pd.get_dummies(df, columns=['City'], drop_first=False)\n\n# 2. Feature Scaling on Age and Salary\nscaler_std = StandardScaler()\ndf_encoded[['Age_Std', 'Salary_Std']] = scaler_std.fit_transform(df_encoded[['Age', 'Salary']])\n\nscaler_minmax = MinMaxScaler()\ndf_encoded[['Age_Norm', 'Salary_Norm']] = scaler_minmax.fit_transform(df_encoded[['Age', 'Salary']])\n\nprint(\"\\n=== Transformed Feature Matrix ===\")\nprint(df_encoded[['Age_Std', 'Salary_Std', 'Age_Norm', 'Salary_Norm']].round(3))\n",
    "expectedOutput": "Transformed feature matrix showing standardized Z-scores and 0-1 normalized ranges for Age and Salary.",
    "tags": [
      "Feature Engineering",
      "Scaling",
      "StandardScaler",
      "OneHot"
    ]
  },
  {
    "id": "9a",
    "moduleId": 4,
    "expNumber": 9,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "9_0",
    "title": "Supervised Learning: Linear Regression & Model Diagnostics",
    "aim": "To build, train, and evaluate a Linear Regression model using scikit-learn, plot the best-fit regression line, and evaluate performance using MSE and R² score.",
    "coreConcepts": [
      "Ordinary Least Squares (OLS) optimization",
      "Model parameters: slope (coefficient) and intercept",
      "Evaluation metrics: Mean Squared Error (MSE), R-squared (R²)"
    ],
    "syntax": "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)",
    "html": "<h3>Aim</h3><p>To build, train, and evaluate a Linear Regression model using scikit-learn, plot the best-fit regression line, and evaluate performance using MSE and R² score.</p><h3>Procedure</h3><ol><li>Synthesize a continuous independent and dependent variable.</li><li>Instantiate LinearRegression and fit the model to data.</li><li>Compute R² score and Mean Squared Error.</li><li>Plot observed data points against the fitted regression line.</li></ol>",
    "initialCode": "import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\nnp.random.seed(42)\nexperience = np.array([1.1, 1.5, 2.0, 2.9, 3.2, 4.0, 4.5, 5.1, 6.0, 7.1, 8.2, 9.5]).reshape(-1, 1)\nsalary = 35 + 8.5 * experience.ravel() + np.random.normal(0, 4, len(experience))\n\nmodel = LinearRegression()\nmodel.fit(experience, salary)\npredictions = model.predict(experience)\n\nslope = model.coef_[0]\nintercept = model.intercept_\nmse = mean_squared_error(salary, predictions)\nr2 = r2_score(salary, predictions)\n\nprint(f\"Regression Equation: Salary = {intercept:.2f} + {slope:.2f} * Experience\")\nprint(f\"Mean Squared Error (MSE): {mse:.2f}\")\nprint(f\"R² Goodness-of-Fit: {r2:.4f}\")\n\nplt.figure(figsize=(7, 4.5))\nplt.scatter(experience, salary, color='#42a5ff', label='Observed Data', s=60)\nplt.plot(experience, predictions, color='#ff6b6b', linewidth=2, label=f'Fit Line (R²={r2:.2f})')\nplt.title(\"Linear Regression: Experience vs Salary\", fontsize=12, fontweight='bold')\nplt.xlabel(\"Years of Experience\")\nplt.ylabel(\"Salary (in ₹10,000s)\")\nplt.legend()\nplt.grid(alpha=0.3)\nplt.tight_layout()\nplt.show()\n",
    "expectedOutput": "Regression equation printed with MSE and R² > 0.90, along with a regression line scatter plot.",
    "tags": [
      "Machine Learning",
      "Linear Regression",
      "Scikit-Learn",
      "Regression"
    ]
  },
  {
    "id": "10a",
    "moduleId": 5,
    "expNumber": 10,
    "partIndex": 0,
    "partLetter": "a",
    "codeKey": "10_0",
    "title": "Supervised Classification: Decision Tree & Confusion Matrix",
    "aim": "To implement a Decision Tree Classifier for binary classification, compute accuracy metrics, and visualize the confusion matrix.",
    "coreConcepts": [
      "Information Gain & Gini Impurity splitting criteria",
      "Train/Test split methodology",
      "Confusion Matrix, Precision, Recall, and F1-Score"
    ],
    "syntax": "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import confusion_matrix, classification_report",
    "html": "<h3>Aim</h3><p>To implement a Decision Tree Classifier for binary classification, compute accuracy metrics, and visualize the confusion matrix.</p><h3>Procedure</h3><ol><li>Create a multi-feature dataset for student pass/fail prediction.</li><li>Split into train and test sets using <code>train_test_split</code>.</li><li>Train a DecisionTreeClassifier.</li><li>Generate the Confusion Matrix and classification report.</li></ol>",
    "initialCode": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix, accuracy_score\n\nnp.random.seed(42)\nn = 200\nhours = np.random.uniform(1, 10, n)\nattendance = np.random.uniform(50, 100, n)\nprob = 1 / (1 + np.exp(-(hours * 0.8 + attendance * 0.05 - 7.5)))\ny = (prob > 0.5).astype(int)\nX = np.column_stack([hours, attendance])\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\n\nclf = DecisionTreeClassifier(max_depth=3, random_state=42)\nclf.fit(X_train, y_train)\n\ny_pred = clf.predict(X_test)\nacc = accuracy_score(y_test, y_pred)\nprint(f\"Classification Accuracy: {acc * 100:.2f}%\\n\")\nprint(\"=== Classification Report ===\")\nprint(classification_report(y_test, y_pred, target_names=['Fail', 'Pass']))\n\ncm = confusion_matrix(y_test, y_pred)\nplt.figure(figsize=(5.5, 4))\nsns.heatmap(cm, annot=True, fmt='d', cmap='Greens', xticklabels=['Fail', 'Pass'], yticklabels=['Fail', 'Pass'])\nplt.title(f\"Decision Tree Confusion Matrix (Acc: {acc*100:.1f}%)\", fontweight='bold')\nplt.xlabel(\"Predicted Class\")\nplt.ylabel(\"Actual Class\")\nplt.tight_layout()\nplt.show()\n",
    "expectedOutput": "Classification metrics printed to terminal; Confusion matrix heatmap rendered.",
    "tags": [
      "Machine Learning",
      "Decision Tree",
      "Classification",
      "Confusion Matrix"
    ]
  },
  {
    "id": "tools",
    "moduleId": 0,
    "expNumber": 0,
    "partIndex": 0,
    "partLetter": "tools",
    "codeKey": "codeT",
    "title": "Interactive Python Code Playground",
    "aim": "Interactive browser-based Data Science sandbox environment to test, explore, and prototype Python code using NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn with Pyodide WebAssembly.",
    "coreConcepts": [
      "Interactive Python Execution",
      "Real-time Data Science Scratchpad",
      "In-browser Matplotlib Plotting"
    ],
    "syntax": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt",
    "html": "<h3>Tools & Code Playground</h3><p>Use this interactive sandbox to experiment freely with Python, test algorithms, analyze custom arrays, or create custom visualizations.</p>",
    "initialCode": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nprint(\"Data Science environment ready\")\nprint(\"NumPy mean:\", np.mean([10, 20, 30, 40, 50]))\nprint(\"\\nPandas DataFrame:\")\ndf = pd.DataFrame({\n    \"Feature A\": [10, 25, 45, 60, 85],\n    \"Feature B\": [15, 30, 50, 75, 90]\n})\nprint(df)\n\n# Create an exploratory plot\nplt.figure(figsize=(7, 4))\nplt.plot(df[\"Feature A\"], df[\"Feature B\"], marker=\"o\", color=\"#38bdf8\", linewidth=2, label=\"Trend\")\nplt.title(\"Interactive Playground Sample Plot\", fontsize=12, fontweight=\"bold\")\nplt.xlabel(\"Feature A\")\nplt.ylabel(\"Feature B\")\nplt.grid(alpha=0.3)\nplt.legend()\nplt.tight_layout()\nplt.show()\n",
    "expectedOutput": "Outputs DataFrame statistics and renders an interactive line plot in the Plots tab.",
    "tags": [
      "Playground",
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib"
    ]
  }
];

export const getExperimentById = (id, subPart) => {
  if (!id) return experimentsData[0];
  const cleaned = String(id).toLowerCase().trim();

  // 1. Direct Tools check
  if (cleaned === 'tools') {
    return experimentsData.find(e => e.id === 'tools') || experimentsData[0];
  }

  // 2. If subPart is specified (e.g. exp=4, part=0 or part='b' or part='all')
  if (subPart !== undefined && subPart !== null && subPart !== '') {
    const sPart = String(subPart).toLowerCase().trim();
    if (sPart !== 'all') {
      // Check numeric index (0 -> a, 1 -> b, etc.)
      const asNum = parseInt(sPart, 10);
      if (!isNaN(asNum)) {
        const byNumAndIndex = experimentsData.find(e => String(e.expNumber) === cleaned && e.partIndex === asNum);
        if (byNumAndIndex) return byNumAndIndex;
      }
      // Check letter (e.g. 'b' -> '4b')
      const targetId = cleaned + sPart;
      const byCombinedId = experimentsData.find(e => e.id.toLowerCase() === targetId);
      if (byCombinedId) return byCombinedId;
    }
  }

  // 3. Direct ID match (e.g. '4a', '5b', '6g', '10a')
  const byId = experimentsData.find(e => e.id.toLowerCase() === cleaned);
  if (byId) return byId;

  // 4. Combined check if id was formatted like '4_0' or '4/0'
  if (cleaned.includes('_') || cleaned.includes('/')) {
    const parts = cleaned.split(/[_/]/);
    const num = parts[0];
    const idx = parseInt(parts[1], 10);
    const found = experimentsData.find(e => String(e.expNumber) === num && (e.partIndex === idx || e.partLetter === parts[1]));
    if (found) return found;
  }

  // 5. Match by experiment number (e.g. '4' -> returns '4a')
  const byNum = experimentsData.find(e => String(e.expNumber) === cleaned);
  if (byNum) return byNum;

  return experimentsData[0];
};

export const getExperimentsByNumber = (num) => {
  return experimentsData.filter(e => e.expNumber === parseInt(num, 10));
};
