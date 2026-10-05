const fs = require('fs');

const dataset = JSON.parse(fs.readFileSync('extracted/dataset.json', 'utf8'));

const L = 'abcdefghijklmnop';

const allExperiments = [];

// Helper to strip HTML tags
function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Helper to extract syntax
function extractSyntax(html) {
  const match = html.match(/Syntax<\/p>(.*?)<p>To /i) || html.match(/Syntax<\/p>(.*?)(?:<h3>|<p>|$)/i);
  if (match) return stripTags(match[1]);
  return null;
}

// 1. Process existing experiments 4, 5, 6
for (let num of ['4', '5', '6']) {
  const exp = dataset.exps[num];
  if (!exp || !exp.parts) continue;

  exp.parts.forEach((part, idx) => {
    const letter = L[idx];
    const id = `${num}${letter}`;
    
    let shortTitle = part.aim.replace(/^To\s+/i, '');
    if (shortTitle.length > 60) {
      shortTitle = shortTitle.slice(0, 57) + '...';
    }
    shortTitle = shortTitle.charAt(0).toUpperCase() + shortTitle.slice(1);

    allExperiments.push({
      id,
      moduleId: parseInt(num) <= 2 ? 1 : parseInt(num) <= 4 ? 2 : parseInt(num) <= 6 ? 3 : 4,
      expNumber: parseInt(num),
      partIndex: idx,
      partLetter: letter,
      codeKey: `${num}_${idx}`,
      title: shortTitle,
      aim: part.aim,
      coreConcepts: [
        "Data Science Practical Curriculum",
        `Experiment ${num}${letter} Laboratory Module`,
        "Python Data Science Stack (NumPy / Pandas / Matplotlib)"
      ],
      syntax: extractSyntax(part.html) || "Refer to syntax section in the theory tab.",
      html: part.html,
      initialCode: part.code.trim(),
      expectedOutput: "Executes without errors and outputs results to stdout / inline plot renderer.",
      tags: num === '4' ? ['Pandas', 'MultiIndex', 'Stack/Unstack', 'Merging'] :
            num === '5' ? ['Matplotlib', 'Seaborn', 'Data Visualization', 'Plots'] :
                          ['Time Series', 'Pandas', 'DateTimeIndex', 'Resampling']
    });
  });
}

// 2. Add complete, high quality lab curricula for Experiments 1, 2, 3, 7, 8, 9, 10
const additionalExps = [
  // Exp 1
  {
    id: "1a",
    moduleId: 1,
    expNumber: 1,
    partIndex: 0,
    partLetter: "a",
    codeKey: "1_0",
    title: "NumPy Array Creation, Reshaping & Indexing",
    aim: "To demonstrate the creation of 1D, 2D, and multi-dimensional NumPy arrays, examine their attributes, reshape array dimensions, and perform integer and boolean slicing.",
    coreConcepts: [
      "NumPy ndarray memory layout and homogeneous data types",
      "Attributes: ndim, shape, size, dtype",
      "Reshaping with reshape() and flattening with ravel()",
      "Vectorized boolean masking and fancy indexing"
    ],
    syntax: `import numpy as np\nnp.array(object, dtype=None)\nnp.arange(start, stop, step)\nndarray.reshape(new_shape)`,
    html: `<h3>Aim</h3><p>To demonstrate the creation of 1D, 2D, and multi-dimensional NumPy arrays, examine their attributes, reshape array dimensions, and perform integer and boolean slicing.</p><h3>Syntax</h3><p><code>import numpy as np<br>arr = np.array([1, 2, 3])<br>reshaped = arr.reshape(rows, cols)</code></p><h3>Procedure</h3><ol><li>Import the NumPy library as <code>np</code>.</li><li>Create 1D and 2D arrays using <code>np.array()</code> and <code>np.arange()</code>.</li><li>Inspect array properties: shape, dimension, item size, and data type.</li><li>Perform array reshaping and conditional boolean filtering.</li></ol>`,
    initialCode: `import numpy as np

# 1. Create a 1D array
arr_1d = np.array([10, 25, 40, 55, 70, 85, 100])
print("1D Array:", arr_1d)
print("Shape:", arr_1d.shape, "| Dimensions:", arr_1d.ndim, "| Data Type:", arr_1d.dtype)

# 2. Reshape into a 2D matrix
matrix = np.arange(1, 13).reshape(3, 4)
print("\\n2D Matrix (3x4):\\n", matrix)

# 3. Slicing rows and columns
print("\\nSub-matrix (rows 0-1, cols 1-3):\\n", matrix[0:2, 1:3])

# 4. Boolean Masking (Filter values > 6)
mask = matrix > 6
print("\\nValues greater than 6:\\n", matrix[mask])
`,
    expectedOutput: `1D Array: [ 10  25  40  55  70  85 100]\nShape: (7,) | Dimensions: 1 | Data Type: int64\n\n2D Matrix (3x4):\n [[ 1  2  3  4]\n [ 5  6  7  8]\n [ 9 10 11 12]]\n\nSub-matrix (rows 0-1, cols 1-3):\n [[2 3]\n [6 7]]\n\nValues greater than 6:\n [ 7  8  9 10 11 12]`,
    tags: ["NumPy", "Arrays", "Vectorization", "Indexing"]
  },
  {
    id: "1b",
    moduleId: 1,
    expNumber: 1,
    partIndex: 1,
    partLetter: "b",
    codeKey: "1_1",
    title: "Vectorized Operations, Universal Functions & Broadcasting",
    aim: "To implement mathematical computations using NumPy universal functions (ufuncs), matrix operations, and demonstrate numpy broadcasting across mismatched dimensions.",
    coreConcepts: [
      "Broadcasting rules across leading and trailing axes",
      "Element-wise operations vs linear algebra dot products",
      "Statistical aggregations: mean, std, sum along axes"
    ],
    syntax: `np.dot(a, b)\nnp.mean(a, axis=0)\nnp.sum(a, axis=1)`,
    html: `<h3>Aim</h3><p>To implement mathematical computations using NumPy universal functions (ufuncs), matrix operations, and demonstrate numpy broadcasting across mismatched dimensions.</p><h3>Procedure</h3><ol><li>Initialize two matrices with compatible broadcasting shapes.</li><li>Perform element-wise multiplication and matrix dot products.</li><li>Compute statistical aggregations along horizontal and vertical axes.</li></ol>`,
    initialCode: `import numpy as np

# 1. Matrix operations
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("Matrix A:\\n", A)
print("Matrix B:\\n", B)
print("\\nElement-wise product (A * B):\\n", A * B)
print("\\nMatrix Dot Product (np.dot(A, B)):\\n", np.dot(A, B))

# 2. Broadcasting a 1D vector across a 2D matrix
row_vector = np.array([10, 20])
broadcasted = A + row_vector
print("\\nBroadcasting (A + [10, 20]):\\n", broadcasted)

# 3. Statistical summary along axes
print("\\nColumn-wise mean (axis=0):", np.mean(A, axis=0))
print("Row-wise sum (axis=1):", np.sum(A, axis=1))
`,
    expectedOutput: `Matrix A:\n [[1 2]\n [3 4]]\nMatrix B:\n [[5 6]\n [7 8]]\n\nElement-wise product (A * B):\n [[ 5 12]\n [21 32]]\n\nMatrix Dot Product (np.dot(A, B)):\n [[19 22]\n [43 50]]\n\nBroadcasting (A + [10, 20]):\n [[11 22]\n [13 24]]\n\nColumn-wise mean (axis=0): [2. 3.]\nRow-wise sum (axis=1): [3 7]`,
    tags: ["NumPy", "Broadcasting", "Matrix Operations", "ufuncs"]
  },

  // Exp 2
  {
    id: "2a",
    moduleId: 1,
    expNumber: 2,
    partIndex: 0,
    partLetter: "a",
    codeKey: "2_0",
    title: "Pandas Series & DataFrame Construction & Querying",
    aim: "To construct Pandas Series and DataFrames from Python dictionaries, inspect row and column metadata, and filter records using boolean conditions and queries.",
    coreConcepts: [
      "Pandas Series vs 2D DataFrame structures",
      "loc[] (label-based) vs iloc[] (integer position-based)",
      "Conditional filtering and query() syntax"
    ],
    syntax: `df = pd.DataFrame(data)\ndf.loc[condition, columns]\ndf.query('column > value')`,
    html: `<h3>Aim</h3><p>To construct Pandas Series and DataFrames from Python dictionaries, inspect row and column metadata, and filter records using boolean conditions and queries.</p><h3>Procedure</h3><ol><li>Create a dataset dictionary containing student records.</li><li>Convert dictionary into a Pandas DataFrame.</li><li>Select columns using label and integer indexers.</li><li>Query records based on multiple filter criteria.</li></ol>`,
    initialCode: `import pandas as pd

# 1. Create a DataFrame from dictionary
data = {
    'StudentID': [101, 102, 103, 104, 105],
    'Name': ['Aarav', 'Bhavya', 'Chirag', 'Divya', 'Eshwar'],
    'Department': ['Data Science', 'AI', 'Data Science', 'CSE', 'AI'],
    'GPA': [8.9, 9.4, 7.8, 8.5, 9.1],
    'Credits': [75, 82, 68, 79, 85]
}

df = pd.DataFrame(data)
print("=== Student DataFrame ===")
print(df)

# 2. DataFrame Metadata
print("\\nDataFrame Shape:", df.shape)
print("Columns:", list(df.columns))

# 3. Filtering using boolean conditions
top_students = df[(df['GPA'] >= 8.5) & (df['Department'] == 'Data Science')]
print("\\nTop Data Science Students (GPA >= 8.5):")
print(top_students[['StudentID', 'Name', 'GPA']])

# 4. Sorting
sorted_df = df.sort_values(by='GPA', ascending=False)
print("\\nStudents Ranked by GPA:")
print(sorted_df[['Name', 'Department', 'GPA']])
`,
    expectedOutput: `=== Student DataFrame ===\n   StudentID    Name    Department  GPA  Credits\n0        101   Aarav  Data Science  8.9       75\n1        102  Bhavya            AI  9.4       82\n2        103  Chirag  Data Science  7.8       68\n3        104   Divya           CSE  8.5       79\n4        105  Eshwar            AI  9.1       85\n\nDataFrame Shape: (5, 5)\nColumns: ['StudentID', 'Name', 'Department', 'GPA', 'Credits']\n\nTop Data Science Students (GPA >= 8.5):\n   StudentID   Name  GPA\n0        101  Aarav  8.9\n\nStudents Ranked by GPA:\n     Name    Department  GPA\n1  Bhavya            AI  9.4\n4  Eshwar            AI  9.1\n0   Aarav  Data Science  8.9\n3   Divya           CSE  8.5\n2  Chirag  Data Science  7.8`,
    tags: ["Pandas", "DataFrame", "Filtering", "Querying"]
  },

  // Exp 3
  {
    id: "3a",
    moduleId: 2,
    expNumber: 3,
    partIndex: 0,
    partLetter: "a",
    codeKey: "3_0",
    title: "Data Cleaning, Handling Missing Values & Imputation",
    aim: "To identify missing and null values in tabular data, evaluate drop strategies, and execute statistical imputation using mean, median, and forward fill techniques.",
    coreConcepts: [
      "Missing data mechanisms: MCAR, MAR, MNAR",
      "Detection via isnull(), isna(), info()",
      "Imputation strategies using fillna() and SimpleImputer"
    ],
    syntax: `df.isnull().sum()\ndf.dropna(axis=0)\ndf['col'].fillna(df['col'].mean(), inplace=True)`,
    html: `<h3>Aim</h3><p>To identify missing and null values in tabular data, evaluate drop strategies, and execute statistical imputation using mean, median, and forward fill techniques.</p><h3>Procedure</h3><ol><li>Synthesize a raw dataset containing NaN missing values.</li><li>Compute total missing values per feature.</li><li>Impute numerical columns with mean/median.</li><li>Verify that no nulls remain in the sanitized dataset.</li></ol>`,
    initialCode: `import pandas as pd
import numpy as np

# Create synthetic dataset with missing values
raw_data = {
    'Item': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Printer', 'Headphones'],
    'Price': [65000, 1200, np.nan, 18000, np.nan, 2500],
    'Stock': [15, np.nan, 45, 10, 8, np.nan],
    'Category': ['Electronics', 'Accessories', 'Accessories', np.nan, 'Electronics', 'Accessories']
}

df = pd.DataFrame(raw_data)
print("=== Original Raw Data ===")
print(df)

# Check missing count
print("\\nMissing values count:")
print(df.isnull().sum())

# Strategy: Impute Price with median, Stock with mean, Category with mode
df_clean = df.copy()
df_clean['Price'] = df_clean['Price'].fillna(df_clean['Price'].median())
df_clean['Stock'] = df_clean['Stock'].fillna(df_clean['Stock'].mean().round())
df_clean['Category'] = df_clean['Category'].fillna(df_clean['Category'].mode()[0])

print("\\n=== Cleaned & Imputed Dataset ===")
print(df_clean)
`,
    expectedOutput: `=== Cleaned dataset with missing values replaced ===`,
    tags: ["Data Cleaning", "Imputation", "NaN Handling", "Pandas"]
  },

  // Exp 7
  {
    id: "7a",
    moduleId: 3,
    expNumber: 7,
    partIndex: 0,
    partLetter: "a",
    codeKey: "7_0",
    title: "Exploratory Data Analysis (EDA) & Correlation Heatmap",
    aim: "To conduct an Exploratory Data Analysis (EDA) on a multi-feature dataset, analyze descriptive statistics, skewness, and visualize feature correlations using a Seaborn heatmap.",
    coreConcepts: [
      "Parametric summaries: mean, std, 5-number summary",
      "Pearson correlation coefficient matrix",
      "Visualizing multi-collinearity using Seaborn heatmap"
    ],
    syntax: `df.describe()\ndf.corr()\nsns.heatmap(corr, annot=True, cmap='coolwarm')`,
    html: `<h3>Aim</h3><p>To conduct an Exploratory Data Analysis (EDA) on a multi-feature dataset, analyze descriptive statistics, skewness, and visualize feature correlations using a Seaborn heatmap.</p><h3>Procedure</h3><ol><li>Generate a simulated dataset with multiple continuous features.</li><li>Compute statistical metrics (describe, skew).</li><li>Calculate the Pearson correlation matrix.</li><li>Plot a heatmap using Seaborn and Matplotlib.</li></ol>`,
    initialCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)
n_samples = 150
study_hours = np.random.uniform(2, 12, n_samples)
attendance = np.clip(study_hours * 7 + np.random.normal(15, 6, n_samples), 40, 100)
prev_score = np.random.uniform(50, 95, n_samples)
final_score = np.clip(study_hours * 4.2 + attendance * 0.35 + prev_score * 0.25 + np.random.normal(0, 4, n_samples), 0, 100)

df = pd.DataFrame({
    'StudyHours': study_hours,
    'Attendance': attendance,
    'PrevScore': prev_score,
    'FinalScore': final_score
})

print("=== Descriptive Statistics ===")
print(df.describe().round(2))

corr_matrix = df.corr()
print("\\n=== Correlation Matrix ===")
print(corr_matrix.round(3))

# Plot Correlation Heatmap
plt.figure(figsize=(7, 5))
sns.heatmap(corr_matrix, annot=True, cmap='Blues', fmt='.2f', linewidths=0.5)
plt.title("Academic Performance Correlation Heatmap", fontsize=13, fontweight='bold', pad=12)
plt.tight_layout()
plt.show()
`,
    expectedOutput: `Descriptive statistics printed to terminal; visual heatmap rendered showing positive correlation between StudyHours, Attendance and FinalScore.`,
    tags: ["EDA", "Correlation", "Heatmap", "Seaborn"]
  },

  // Exp 8
  {
    id: "8a",
    moduleId: 4,
    expNumber: 8,
    partIndex: 0,
    partLetter: "a",
    codeKey: "8_0",
    title: "Feature Engineering: Scaling & One-Hot Encoding",
    aim: "To demonstrate feature engineering techniques by scaling numerical attributes using StandardScaler and MinMaxScaler, and encoding categorical variables using One-Hot Encoding.",
    coreConcepts: [
      "Standardization (Z-score normalization) vs Min-Max Normalization",
      "One-Hot Encoding for nominal categorical features",
      "Scikit-learn Transformer pipeline API"
    ],
    syntax: `from sklearn.preprocessing import StandardScaler, MinMaxScaler, OneHotEncoder\nscaler = StandardScaler().fit_transform(X)`,
    html: `<h3>Aim</h3><p>To demonstrate feature engineering techniques by scaling numerical attributes using StandardScaler and MinMaxScaler, and encoding categorical variables using One-Hot Encoding.</p><h3>Procedure</h3><ol><li>Create a mixed dataset with categorical and numerical features.</li><li>Apply StandardScaler to normalize features to mean=0, std=1.</li><li>Apply One-Hot Encoding using <code>pd.get_dummies()</code>.</li><li>Inspect the transformed numerical feature space.</li></ol>`,
    initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Create a sample customer dataset
df = pd.DataFrame({
    'Age': [22, 45, 33, 56, 28],
    'Salary': [28000, 85000, 52000, 120000, 36000],
    'City': ['Tirupati', 'Bangalore', 'Hyderabad', 'Bangalore', 'Tirupati'],
    'Purchased': ['No', 'Yes', 'Yes', 'Yes', 'No']
})

print("=== Original Dataset ===")
print(df)

# 1. One-Hot Encoding for categorical feature 'City'
df_encoded = pd.get_dummies(df, columns=['City'], drop_first=False)

# 2. Feature Scaling on Age and Salary
scaler_std = StandardScaler()
df_encoded[['Age_Std', 'Salary_Std']] = scaler_std.fit_transform(df_encoded[['Age', 'Salary']])

scaler_minmax = MinMaxScaler()
df_encoded[['Age_Norm', 'Salary_Norm']] = scaler_minmax.fit_transform(df_encoded[['Age', 'Salary']])

print("\\n=== Transformed Feature Matrix ===")
print(df_encoded[['Age_Std', 'Salary_Std', 'Age_Norm', 'Salary_Norm']].round(3))
`,
    expectedOutput: `Transformed feature matrix showing standardized Z-scores and 0-1 normalized ranges for Age and Salary.`,
    tags: ["Feature Engineering", "Scaling", "StandardScaler", "OneHot"]
  },

  // Exp 9
  {
    id: "9a",
    moduleId: 4,
    expNumber: 9,
    partIndex: 0,
    partLetter: "a",
    codeKey: "9_0",
    title: "Supervised Learning: Linear Regression & Model Diagnostics",
    aim: "To build, train, and evaluate a Linear Regression model using scikit-learn, plot the best-fit regression line, and evaluate performance using MSE and R² score.",
    coreConcepts: [
      "Ordinary Least Squares (OLS) optimization",
      "Model parameters: slope (coefficient) and intercept",
      "Evaluation metrics: Mean Squared Error (MSE), R-squared (R²)"
    ],
    syntax: `from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)`,
    html: `<h3>Aim</h3><p>To build, train, and evaluate a Linear Regression model using scikit-learn, plot the best-fit regression line, and evaluate performance using MSE and R² score.</p><h3>Procedure</h3><ol><li>Synthesize a continuous independent and dependent variable.</li><li>Instantiate LinearRegression and fit the model to data.</li><li>Compute R² score and Mean Squared Error.</li><li>Plot observed data points against the fitted regression line.</li></ol>`,
    initialCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

np.random.seed(42)
experience = np.array([1.1, 1.5, 2.0, 2.9, 3.2, 4.0, 4.5, 5.1, 6.0, 7.1, 8.2, 9.5]).reshape(-1, 1)
salary = 35 + 8.5 * experience.ravel() + np.random.normal(0, 4, len(experience))

model = LinearRegression()
model.fit(experience, salary)
predictions = model.predict(experience)

slope = model.coef_[0]
intercept = model.intercept_
mse = mean_squared_error(salary, predictions)
r2 = r2_score(salary, predictions)

print(f"Regression Equation: Salary = {intercept:.2f} + {slope:.2f} * Experience")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R² Goodness-of-Fit: {r2:.4f}")

plt.figure(figsize=(7, 4.5))
plt.scatter(experience, salary, color='#42a5ff', label='Observed Data', s=60)
plt.plot(experience, predictions, color='#ff6b6b', linewidth=2, label=f'Fit Line (R²={r2:.2f})')
plt.title("Linear Regression: Experience vs Salary", fontsize=12, fontweight='bold')
plt.xlabel("Years of Experience")
plt.ylabel("Salary (in ₹10,000s)")
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
`,
    expectedOutput: `Regression equation printed with MSE and R² > 0.90, along with a regression line scatter plot.`,
    tags: ["Machine Learning", "Linear Regression", "Scikit-Learn", "Regression"]
  },

  // Exp 10
  {
    id: "10a",
    moduleId: 5,
    expNumber: 10,
    partIndex: 0,
    partLetter: "a",
    codeKey: "10_0",
    title: "Supervised Classification: Decision Tree & Confusion Matrix",
    aim: "To implement a Decision Tree Classifier for binary classification, compute accuracy metrics, and visualize the confusion matrix.",
    coreConcepts: [
      "Information Gain & Gini Impurity splitting criteria",
      "Train/Test split methodology",
      "Confusion Matrix, Precision, Recall, and F1-Score"
    ],
    syntax: `from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import confusion_matrix, classification_report`,
    html: `<h3>Aim</h3><p>To implement a Decision Tree Classifier for binary classification, compute accuracy metrics, and visualize the confusion matrix.</p><h3>Procedure</h3><ol><li>Create a multi-feature dataset for student pass/fail prediction.</li><li>Split into train and test sets using <code>train_test_split</code>.</li><li>Train a DecisionTreeClassifier.</li><li>Generate the Confusion Matrix and classification report.</li></ol>`,
    initialCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

np.random.seed(42)
n = 200
hours = np.random.uniform(1, 10, n)
attendance = np.random.uniform(50, 100, n)
prob = 1 / (1 + np.exp(-(hours * 0.8 + attendance * 0.05 - 7.5)))
y = (prob > 0.5).astype(int)
X = np.column_stack([hours, attendance])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

clf = DecisionTreeClassifier(max_depth=3, random_state=42)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Classification Accuracy: {acc * 100:.2f}%\\n")
print("=== Classification Report ===")
print(classification_report(y_test, y_pred, target_names=['Fail', 'Pass']))

cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(5.5, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Greens', xticklabels=['Fail', 'Pass'], yticklabels=['Fail', 'Pass'])
plt.title(f"Decision Tree Confusion Matrix (Acc: {acc*100:.1f}%)", fontweight='bold')
plt.xlabel("Predicted Class")
plt.ylabel("Actual Class")
plt.tight_layout()
plt.show()
`,
    expectedOutput: `Classification metrics printed to terminal; Confusion matrix heatmap rendered.`,
    tags: ["Machine Learning", "Decision Tree", "Classification", "Confusion Matrix"]
  }
];

// Special Playground / Tools item
const toolsItem = {
  id: "tools",
  moduleId: 0,
  expNumber: 0,
  partIndex: 0,
  partLetter: "tools",
  codeKey: "codeT",
  title: "Interactive Python Code Playground",
  aim: "Interactive browser-based Data Science sandbox environment to test, explore, and prototype Python code using NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn with Pyodide WebAssembly.",
  coreConcepts: [
    "Interactive Python Execution",
    "Real-time Data Science Scratchpad",
    "In-browser Matplotlib Plotting"
  ],
  syntax: `import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt`,
  html: `<h3>Tools & Code Playground</h3><p>Use this interactive sandbox to experiment freely with Python, test algorithms, analyze custom arrays, or create custom visualizations.</p>`,
  initialCode: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Data Science environment ready")
print("NumPy mean:", np.mean([10, 20, 30, 40, 50]))
print("\\nPandas DataFrame:")
df = pd.DataFrame({
    "Feature A": [10, 25, 45, 60, 85],
    "Feature B": [15, 30, 50, 75, 90]
})
print(df)

# Create an exploratory plot
plt.figure(figsize=(7, 4))
plt.plot(df["Feature A"], df["Feature B"], marker="o", color="#38bdf8", linewidth=2, label="Trend")
plt.title("Interactive Playground Sample Plot", fontsize=12, fontweight="bold")
plt.xlabel("Feature A")
plt.ylabel("Feature B")
plt.grid(alpha=0.3)
plt.legend()
plt.tight_layout()
plt.show()
`,
  expectedOutput: `Outputs DataFrame statistics and renders an interactive line plot in the Plots tab.`,
  tags: ["Playground", "Python", "NumPy", "Pandas", "Matplotlib"]
};

// Combine all experiments sorted
const sortedExperiments = [...allExperiments, ...additionalExps].sort((a, b) => {
  if (a.expNumber !== b.expNumber) return a.expNumber - b.expNumber;
  return a.partLetter.localeCompare(b.partLetter);
});

// Add tools at the end of array
const fullList = [...sortedExperiments, toolsItem];

console.log('Total experiments compiled:', fullList.length);

const outContent = `// Auto-generated data fixture for all Data Science Lab Experiments
export const experimentsData = ${JSON.stringify(fullList, null, 2)};

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
`;

fs.writeFileSync('src/data/experimentsData.js', outContent);
console.log('Successfully wrote src/data/experimentsData.js');
